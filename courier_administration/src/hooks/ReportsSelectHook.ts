import {useEffect, useState} from "react";
import axios from "axios";
import {node_mysql} from "../data/API";

interface ReportType {
    report_type_id: number,
    description: string
}

export function useReportsSelect() {
    let [reportTypes, setReportTypes] = useState<ReportType[]>([]);

    async function fetchGoodTypes() {
        try {
            const response = await axios.post(
                node_mysql,
                {query: 'SELECT * FROM report_types'}
            );
            setReportTypes(response.data.result);
        } catch (e: unknown) {
        }
    }

    useEffect(() => {
        fetchGoodTypes();
        return () => {
            setReportTypes([])
        }
    }, [])

    return {reportTypes: reportTypes, setReportTypes: setReportTypes}
}