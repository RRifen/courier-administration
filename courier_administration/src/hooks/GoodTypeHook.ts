import {useEffect, useState} from "react";
import DBAccessProps from "../data/Props";
import {goodTypesHeaders} from "../data/Headers";
import axios from "axios";
import {node_mysql} from "../data/API";

export function useGoodType() {
    const [goodTypes, setGoodTypes] = useState<object[]>([]);
    const [goodTypesPage, setGoodTypesPage] = useState(1);
    const [perGoodTypePage, setPerGoodTypePage] = useState(5);
    const [showErrorDelete, setShowErrorDelete] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [updateObj, setUpdateObj] = useState({good_type_id: "", description: ""});

    const handleCloseErrorDelete = () => setShowErrorDelete(false);
    const handleShowErrorDelete = () => setShowErrorDelete(true);
    const handleCloseUpdateModal = () => setShowUpdateModal(false);
    const handleShowUpdateModal = () => setShowUpdateModal(true);

    function generatePropsForDBAccess(): DBAccessProps {
        let props = Object();
        props.page = goodTypesPage;
        props.perPage = perGoodTypePage;
        props.data = goodTypes;
        props.headers = goodTypesHeaders;
        props.searchHandler = searchHandler;
        props.setPage = setGoodTypesPage;
        props.setPerPage = setPerGoodTypePage;
        props.deleteHandler = deleteGoodTypeHandler;
        props.updateHandlerCallback = updateGoodTypeHandlerCallback;
        props.insertHandler = insertGoodTypeHandler;
        props.handleCloseErrorDelete = handleCloseErrorDelete;
        props.showErrorDelete = showErrorDelete;
        props.updateObj = updateObj;
        props.setUpdateObj = setUpdateObj;
        props.updateHandler = updateGoodTypeHandler;
        props.showUpdateModal = showUpdateModal;
        props.handleCloseUpdateModal = handleCloseUpdateModal;
        return props;
    }


    function updateGoodTypeHandlerCallback(obj: any) {
        setUpdateObj({...obj});
        handleShowUpdateModal();
    }

    async function deleteGoodTypeHandler(obj: any) {
        try {
            await axios.post(
                node_mysql,
                {query: `DELETE FROM good_types WHERE good_type_id='${obj.good_type_id}'`}
            )
            let goodTypesCopy = [...goodTypes];
            goodTypesCopy.splice(goodTypes.indexOf(obj), 1);
            setGoodTypes(goodTypesCopy);
        } catch {
            handleShowErrorDelete();
        }
    }

    async function updateGoodTypeHandler(obj: any) {
        let response = {data:{error: "Something went wrong"}};
        try {
            await axios.post(
                node_mysql,
                {query: `UPDATE good_types SET description='${obj.description}' WHERE good_type_id='${obj.good_type_id}'`}
            ).catch((error) => {
                alert(error.response.data.error);
                throw new Error();
            })
            alert("Вы успешно обновили данные");
            readHandler();
        } catch (e) {
        }
    }

    async function insertGoodTypeHandler(obj: any) {
        try {
            let response = await axios.post(
                node_mysql,
                {query: `INSERT INTO good_types(description) VALUES('${obj.description}')`}
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
        if (obj.good_type_id !== "") {
            expArray.push(`good_type_id='${obj.good_type_id}'`);
        }
        if (obj.description !== "") {
            expArray.push(`description like '%${obj.description}%'`);
        }

        if (expArray.length === 0) {
            readHandler();
        }
        else {
            await fetchGoodTypes( "SELECT good_type_id, description FROM good_types WHERE " + expArray.join(" AND "));
            setGoodTypesPage(1);
        }
    }

    async function readHandler() {
        await fetchGoodTypes("SELECT good_type_id, description FROM good_types");
    }

    async function fetchGoodTypes(query: string) {
        try {
            const response = await axios.post(
                node_mysql,
                {query: query}
            );
            setGoodTypes(response.data.result);
        } catch (e: unknown) {
        }
    }

    useEffect(() => {
        readHandler();
        return () => {
            setGoodTypes([]);
        }
    }, []);

    return { generatePropsForDBAccess }
}