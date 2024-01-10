import {useEffect, useState} from "react";
import axios from "axios";
import DBAccessProps from "../data/Props";
import {adminsHeaders} from "../data/Headers";
import {node_mysql} from "../data/API";

export function useAdmins() {
    const [admins, setAdmins] = useState<object[]>([]);
    const [adminPage, setAdminPage] = useState(1);
    const [perAdminPage, setPerAdminPage] = useState(5);
    const [showErrorDelete, setShowErrorDelete] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [updateObj, setUpdateObj] = useState({admin_id: "", login: "", issue_point_id: ""});

    const handleCloseErrorDelete = () => setShowErrorDelete(false);
    const handleShowErrorDelete = () => setShowErrorDelete(true);
    const handleCloseUpdateModal = () => setShowUpdateModal(false);
    const handleShowUpdateModal = () => setShowUpdateModal(true);

    function generatePropsForDBAccess(): DBAccessProps {
        let props = Object();
        props.page = adminPage;
        props.perPage = perAdminPage;
        props.data = admins;
        props.headers = adminsHeaders;
        props.searchHandler = searchHandler;
        props.setPage = setAdminPage;
        props.setPerPage = setPerAdminPage;
        props.deleteHandler = deleteAdminHandler;
        props.updateHandlerCallback = updateAdminHandlerCallback;
        props.insertHandler = insertAdminHandler;
        props.handleCloseErrorDelete = handleCloseErrorDelete;
        props.showErrorDelete = showErrorDelete;
        props.updateObj = updateObj;
        props.setUpdateObj = setUpdateObj;
        props.updateHandler = updateAdminHandler;
        props.showUpdateModal = showUpdateModal;
        props.handleCloseUpdateModal = handleCloseUpdateModal;
        return props;
    }


    function updateAdminHandlerCallback(obj: any) {
        setUpdateObj({...obj});
        handleShowUpdateModal();
    }

    async function deleteAdminHandler(obj: any) {
        try {
            await axios.post(
                node_mysql,
                {query: `DELETE FROM admins WHERE admin_id='${obj.admin_id}'`}
            )
            let adminsCopy = [...admins];
            adminsCopy.splice(admins.indexOf(obj), 1);
            setAdmins(adminsCopy);
        } catch {
            handleShowErrorDelete();
        }
    }

    async function updateAdminHandler(obj: any) {
        let response = {data:{error: "Something went wrong"}};
        try {
            await axios.post(
                node_mysql,
                {query: `UPDATE admins SET login='${obj.login}', issue_point_id='${obj.issue_point_id}' WHERE admin_id='${obj.admin_id}'`}
            ).catch((error) => {
                alert(error.response.data.error);
                throw new Error();
            })
            alert("Вы успешно обновили данные");
            readHandler();
        } catch (e) {
        }
    }

    async function insertAdminHandler(obj: any) {
        try {
            let response = await axios.post(
                node_mysql,
                {query: `INSERT INTO admins(login, password, issue_point_id) VALUES('${obj.login}', '${obj.password}', '${obj.issue_point_id}')`}
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
        if (obj.login !== "") {
            expArray.push(`login like '%${obj.login}%'`);
        }
        if (obj.admin_id !== "") {
            expArray.push(`admin_id='${obj.admin_id}'`);
        }
        if (obj.issue_point_id !== "") {
            expArray.push(`issue_point_id='${obj.issue_point_id}'`);
        }

        if (expArray.length === 0) {
            await fetchAdmins("SELECT admin_id, login, issue_point_id FROM admins");
        }
        else {
            await fetchAdmins( "SELECT admin_id, login, issue_point_id FROM admins WHERE " + expArray.join(" AND "));
        }
    }

    async function readHandler() {
        return await fetchAdmins("SELECT admin_id, login, issue_point_id FROM admins");
    }

    async function fetchAdmins(query: string) {
        try {
            const response = await axios.post(
                node_mysql,
                {query: query}
            );
            setAdmins(response.data.result);
        } catch (e: unknown) {
        }
    }

    useEffect(() => {
        readHandler();
        return () => {
            setAdmins([]);
        }
    }, []);

    return { generatePropsForDBAccess }
}