import {useEffect, useState} from "react";
import DBAccessProps from "../data/Props";
import {issuePointsHeaders} from "../data/Headers";
import axios from "axios";
import {node_mysql} from "../data/API";

export function useIssuePoints() {
    const [issuePoints, setIssuePoints] = useState<object[]>([]);
    const [issuePointPage, setIssuePointPage] = useState(1);
    const [perIssuePointPage, setPerIssuePointPage] = useState(5);
    const [showErrorDelete, setShowErrorDelete] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [updateObj, setUpdateObj] = useState({issue_point_id: "", address: "", admin_id: ""});

    const handleCloseErrorDelete = () => setShowErrorDelete(false);
    const handleShowErrorDelete = () => setShowErrorDelete(true);
    const handleCloseUpdateModal = () => setShowUpdateModal(false);
    const handleShowUpdateModal = () => setShowUpdateModal(true);

    function generatePropsForDBAccess(): DBAccessProps {
        let props = Object();
        props.page = issuePointPage;
        props.perPage = perIssuePointPage;
        props.data = issuePoints;
        props.headers = issuePointsHeaders;
        props.searchHandler = searchHandler;
        props.setPage = setIssuePointPage;
        props.setPerPage = setPerIssuePointPage;
        props.deleteHandler = deleteIssuePointHandler;
        props.updateHandlerCallback = updateIssuePointHandlerCallback;
        props.insertHandler = insertIssuePointHandler;
        props.handleCloseErrorDelete = handleCloseErrorDelete;
        props.showErrorDelete = showErrorDelete;
        props.updateObj = updateObj;
        props.setUpdateObj = setUpdateObj;
        props.updateHandler = updateIssuePointHandler;
        props.showUpdateModal = showUpdateModal;
        props.handleCloseUpdateModal = handleCloseUpdateModal;
        return props;
    }


    function updateIssuePointHandlerCallback(obj: any) {
        setUpdateObj({...obj});
        handleShowUpdateModal();
    }

    async function deleteIssuePointHandler(obj: any) {
        try {
            await axios.post(
                node_mysql,
                {query: `DELETE FROM issue_points WHERE issue_point_id='${obj.issue_point_id}'`}
            )
            let issuePointsCopy = [...issuePoints];
            issuePointsCopy.splice(issuePoints.indexOf(obj), 1);
            setIssuePoints(issuePointsCopy);
        } catch {
            handleShowErrorDelete();
        }
    }

    async function updateIssuePointHandler(obj: any) {
        let response = {data:{error: "Something went wrong"}};
        try {
            await axios.post(
                node_mysql,
                {query: `UPDATE issue_points SET address='${obj.address}' WHERE issue_point_id='${obj.issue_point_id}'`}
            ).catch((error) => {
                alert(error.response.data.error);
                throw new Error();
            })
            alert("Вы успешно обновили данные");
            readHandler();
        } catch (e) {
        }
    }

    async function insertIssuePointHandler(obj: any) {
        try {
            let response = await axios.post(
                node_mysql,
                {query: `INSERT INTO issue_points(address) VALUES('${obj.address}')`}
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
        if (obj.issue_point_id !== "") {
            expArray.push(`issue_point_id='${obj.issue_point_id}'`);
        }
        if (obj.address !== "") {
            expArray.push(`address like '%${obj.address}%'`);
        }
        if (obj.admin_id !== "") {
            expArray.push(`admin_id='${obj.admin_id}'`)
        }

        if (expArray.length === 0) {
            await readHandler();
        }
        else {
            await fetchIssuePoints( "SELECT DISTINCT issue_point_id, address FROM issue_points LEFT JOIN admins USING(issue_point_id) WHERE " + expArray.join(" AND "));
        }
    }

    async function readHandler() {
        await fetchIssuePoints("SELECT issue_point_id, address FROM issue_points");
    }

    interface Admin {
        admin_id: number,
        issue_point_id: number
    }

    interface IssuePoint {
        issue_point_id: number,
        address: string,
        admin_ids: string
    }

    async function fetchIssuePoints(query: string) {
        try {
            let response = await axios.post(
                node_mysql,
                {query: query}
            );
            let issuePoints : Array<IssuePoint> = response.data.result;

            response = await axios.post(
                node_mysql,
                {query: "SELECT admin_id, issue_point_id FROM admins"}
            )
            let admins : Array<Admin> = response.data.result;

            const issuePointToAdmin: any = {};
            admins.forEach((value) => {
                if (!issuePointToAdmin.hasOwnProperty(value.issue_point_id)) {
                    issuePointToAdmin[value.issue_point_id] = new Array<number>();
                }
                issuePointToAdmin[value.issue_point_id].push(value.admin_id);
            })

            issuePoints.forEach((value) => {
                if (issuePointToAdmin.hasOwnProperty(value.issue_point_id)) {
                    value.admin_ids = issuePointToAdmin[value.issue_point_id].join(", ");
                }
                else {
                    value.admin_ids = "";
                }
            })
            setIssuePoints(issuePoints);
        } catch (e: unknown) {
            console.log(e)
        }
    }

    useEffect(() => {
        readHandler();
        return () => {
            setIssuePoints([]);
        }
    }, []);

    return { generatePropsForDBAccess }
}