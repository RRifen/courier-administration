import {useEffect, useState} from "react";
import axios from "axios";
import {node_mysql} from "../data/API";

interface GoodType {
    good_type_id: number,
    description: string
}

export function useGoodsSelect() {
    let [goodTypes, setGoodTypes] = useState<GoodType[]>([]);

    async function fetchGoodTypes() {
        try {
            const response = await axios.post(
                node_mysql,
                {query: 'SELECT * FROM good_types'}
            );
            setGoodTypes(response.data.result);
        } catch (e: unknown) {
        }
    }

    useEffect(() => {
        fetchGoodTypes();
        return () => {
            setGoodTypes([])
        }
    }, [])

    return {goodTypes: goodTypes, setGoodTypes: setGoodTypes}
}