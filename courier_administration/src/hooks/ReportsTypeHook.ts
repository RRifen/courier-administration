import {useEffect, useState} from "react";
import DBAccessProps from "../data/Props";
import {reportTypesHeaders} from "../data/Headers";
import axios from "axios";
import {node_mysql} from "../data/API";

export function useReportTypes() {
    const [reportTypes, setReportTypes] = useState<object[]>([]);
    const [reportTypesPage, setReportTypesPage] = useState(1);
    const [perReportTypePage, setPerReportTypePage] = useState(5);
    const [showErrorDelete, setShowErrorDelete] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [updateObj, setUpdateObj] = useState({report_type_id: "", description: ""});

    const handleCloseErrorDelete = () => setShowErrorDelete(false);
    const handleShowErrorDelete = () => setShowErrorDelete(true);
    const handleCloseUpdateModal = () => setShowUpdateModal(false);
    const handleShowUpdateModal = () => setShowUpdateModal(true);

    function generatePropsForDBAccess(): DBAccessProps {
        let props = Object();
        props.page = reportTypesPage;
        props.perPage = perReportTypePage;
        props.data = reportTypes;
        props.headers = reportTypesHeaders;
        props.searchHandler = searchHandler;
        props.setPage = setReportTypesPage;
        props.setPerPage = setPerReportTypePage;
        props.deleteHandler = deleteReportTypeHandler;
        props.updateHandlerCallback = updateReportTypeHandlerCallback;
        props.insertHandler = insertReportTypeHandler;
        props.handleCloseErrorDelete = handleCloseErrorDelete;
        props.showErrorDelete = showErrorDelete;
        props.updateObj = updateObj;
        props.setUpdateObj = setUpdateObj;
        props.updateHandler = updateReportTypeHandler;
        props.showUpdateModal = showUpdateModal;
        props.handleCloseUpdateModal = handleCloseUpdateModal;
        return props;
    }


    function updateReportTypeHandlerCallback(obj: any) {
        setUpdateObj({...obj});
        handleShowUpdateModal();
    }

    async function deleteReportTypeHandler(obj: any) {
        try {
            await axios.post(
                node_mysql,
                {query: `DELETE FROM report_types WHERE report_type_id='${obj.report_type_id}'`}
            )
            let reportTypesCopy = [...reportTypes];
            reportTypesCopy.splice(reportTypes.indexOf(obj), 1);
            setReportTypes(reportTypesCopy);
        } catch {
            handleShowErrorDelete();
        }
    }

    async function updateReportTypeHandler(obj: any) {
        let response = {data:{error: "Something went wrong"}};
        try {
            await axios.post(
                node_mysql,
                {query: `UPDATE report_types SET description='${obj.description}' WHERE report_type_id='${obj.report_type_id}'`}
            ).catch((error) => {
                alert(error.response.data.error);
                throw new Error();
            })
            alert("Вы успешно обновили данные");
            readHandler();
        } catch (e) {
        }
    }

    async function insertReportTypeHandler(obj: any) {
        try {
            let response = await axios.post(
                node_mysql,
                {query: `INSERT INTO report_types(description) VALUES('${obj.description}')`}
            ).catch((error) => {
                alert(error.response.data.error);
                throw new Error();
            })
            alert("Вы успешно добавили данные");
            readHandler();
        } catch (e) {
        }
    }

    async function searchHandler(obj: any) {
        let expArray = [];
        if (obj.report_type_id !== "") {
            expArray.push(`report_type_id='${obj.report_type_id}'`);
        }
        if (obj.description !== "") {
            expArray.push(`description like '%${obj.description}%'`);
        }

        if (expArray.length === 0) {
            readHandler();
        }
        else {
            await fetchReportTypes( "SELECT report_type_id, description FROM report_types WHERE " + expArray.join(" AND "));
            setReportTypesPage(1);
        }
    }

    async function readHandler() {
        await fetchReportTypes("SELECT report_type_id, description FROM report_types");
    }

    async function fetchReportTypes(query: string) {
        try {
            const response = await axios.post(
                node_mysql,
                {query: query}
            );
            setReportTypes(response.data.result);
        } catch (e: unknown) {
        }
    }

    useEffect(() => {
        readHandler();
        return () => {
            setReportTypes([]);
        }
    }, []);

    return { generatePropsForDBAccess }
}