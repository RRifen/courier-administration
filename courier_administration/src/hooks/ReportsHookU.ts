import {useEffect, useState} from "react";
import DBAccessProps from "../data/Props";
import {reportsHeaders} from "../data/Headers";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import {node_mysql} from "../data/API";

export function useReportsU() {
    const [reports, setReports] = useState<object[]>([]);
    const [reportPage, setReportPage] = useState(1);
    const [perReportPage, setPerReportPage] = useState(5);
    const [showErrorDelete, setShowErrorDelete] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [updateObj, setUpdateObj] = useState({report_id: "", admin_id: "", report_type_id: "", report_date: "", report_text: ""});

    const handleCloseErrorDelete = () => setShowErrorDelete(false);
    const handleShowErrorDelete = () => setShowErrorDelete(true);
    const handleCloseUpdateModal = () => setShowUpdateModal(false);
    const handleShowUpdateModal = () => setShowUpdateModal(true);

    function generatePropsForDBAccess(): DBAccessProps {
        let props = Object();
        props.page = reportPage;
        props.perPage = perReportPage;
        props.data = reports;
        props.headers = reportsHeaders;
        props.searchHandler = searchHandler;
        props.setPage = setReportPage;
        props.setPerPage = setPerReportPage;
        props.deleteHandler = deleteReportHandler;
        props.updateHandlerCallback = updateReportHandlerCallback;
        props.insertHandler = insertReportHandler;
        props.handleCloseErrorDelete = handleCloseErrorDelete;
        props.showErrorDelete = showErrorDelete;
        props.updateObj = updateObj;
        props.setUpdateObj = setUpdateObj;
        props.updateHandler = updateReportHandler;
        props.showUpdateModal = showUpdateModal;
        props.handleCloseUpdateModal = handleCloseUpdateModal;
        return props;
    }


    function updateReportHandlerCallback(obj: any) {
        setUpdateObj({...obj});
        handleShowUpdateModal();
    }

    async function deleteReportHandler(obj: any) {
        try {
            {/*
             // @ts-ignore */}
            let id = jwtDecode<JwtBody>(localStorage.getItem('token')).id;
            await axios.post(
                node_mysql,
                {query: `DELETE FROM reports WHERE report_id='${obj.report_id}' AND admin_id='${id}'`}
            )
            let reportsCopy = [...reports];
            reportsCopy.splice(reports.indexOf(obj), 1);
            setReports(reportsCopy);
        } catch {
            handleShowErrorDelete();
        }
    }

    async function updateReportHandler(obj: any) {
        let response = {data:{error: "Something went wrong"}};
        try {
            {/*
             // @ts-ignore */}
            let id = jwtDecode<JwtBody>(localStorage.getItem('token')).id;
            await axios.post(
                node_mysql,
                {query: `UPDATE reports SET report_type_id='${obj.report_type_id}', report_date='${obj.report_date}', report_text='${obj.report_text}' WHERE report_id='${obj.report_id}' AND admin_id='${id}'`}
            ).catch((error) => {
                alert(error.response.data.error);
                throw new Error();
            })
            alert("Вы успешно обновили данные");
            readHandler();
        } catch (e) {
        }
    }

    async function insertReportHandler(obj: any) {
        try {
            {/*
             // @ts-ignore */}
            let id = jwtDecode<JwtBody>(localStorage.getItem('token')).id;
            let response = await axios.post(
                node_mysql,
                {query: `INSERT INTO reports(admin_id, report_type_id, report_text) VALUES('${id}', '${obj.report_type_id}', '${obj.report_text}')`}
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
        if (obj.report_id !== "") {
            expArray.push(`report_id='${obj.report_id}'`);
        }
        if (obj.admin_id !== "") {
            expArray.push(`admin_id='${obj.admin_id}'`);
        }
        if (obj.report_type_id !== "") {
            expArray.push(`report_type_id='${obj.report_type_id}'`);
        }
        if (obj.report_text !== "") {
            expArray.push(`report_text like '%${obj.report_text}%'`);
        }

        if (expArray.length === 0) {
            await readHandler();
        }
        else {
            {/*
             // @ts-ignore */}
            let id = jwtDecode<JwtBody>(localStorage.getItem('token')).id;
            await fetchReports( `SELECT report_id, admin_id, report_type_id, description, report_date, report_text FROM reports JOIN report_types USING(report_type_id) WHERE admin_id=${id} AND ` + expArray.join(" AND "));
        }
    }

    async function readHandler() {
        {/*
         // @ts-ignore */}
        let id = jwtDecode<JwtBody>(localStorage.getItem('token')).id;
        return await fetchReports(`SELECT report_id, admin_id, report_type_id, description, report_date, report_text FROM reports JOIN report_types USING(report_type_id) WHERE admin_id=${id}`);
    }

    async function fetchReports(query: string) {
        try {
            const response = await axios.post(
                node_mysql,
                {query: query}
            );
            setReports(response.data.result);
        } catch (e: unknown) {
        }
    }

    useEffect(() => {
        readHandler();
        return () => {
            setReports([]);
        }
    }, []);

    return { generatePropsForDBAccess }
}