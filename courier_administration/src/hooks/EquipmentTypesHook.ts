import {useEffect, useState} from "react";
import DBAccessProps from "../data/Props";
import {equipmentTypesHeaders} from "../data/Headers";
import axios from "axios";
import {node_mysql} from "../data/API";

export function useEquipmentTypes() {
    const [equipmentTypes, setEquipmentTypes] = useState<object[]>([]);
    const [equipmentTypesPage, setEquipmentTypesPage] = useState(1);
    const [perEquipmentTypePage, setPerEquipmentTypePage] = useState(5);
    const [showErrorDelete, setShowErrorDelete] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [updateObj, setUpdateObj] = useState({equipment_type_id: "", description: ""});

    const handleCloseErrorDelete = () => setShowErrorDelete(false);
    const handleShowErrorDelete = () => setShowErrorDelete(true);
    const handleCloseUpdateModal = () => setShowUpdateModal(false);
    const handleShowUpdateModal = () => setShowUpdateModal(true);

    function generatePropsForDBAccess(): DBAccessProps {
        let props = Object();
        props.page = equipmentTypesPage;
        props.perPage = perEquipmentTypePage;
        props.data = equipmentTypes;
        props.headers = equipmentTypesHeaders;
        props.searchHandler = searchHandler;
        props.setPage = setEquipmentTypesPage;
        props.setPerPage = setPerEquipmentTypePage;
        props.deleteHandler = deleteEquipmentTypeHandler;
        props.updateHandlerCallback = updateEquipmentTypeHandlerCallback;
        props.insertHandler = insertEquipmentTypeHandler;
        props.handleCloseErrorDelete = handleCloseErrorDelete;
        props.showErrorDelete = showErrorDelete;
        props.updateObj = updateObj;
        props.setUpdateObj = setUpdateObj;
        props.updateHandler = updateEquipmentTypeHandler;
        props.showUpdateModal = showUpdateModal;
        props.handleCloseUpdateModal = handleCloseUpdateModal;
        return props;
    }


    function updateEquipmentTypeHandlerCallback(obj: any) {
        setUpdateObj({...obj});
        handleShowUpdateModal();
    }

    async function deleteEquipmentTypeHandler(obj: any) {
        try {
            await axios.post(
                node_mysql,
                {query: `DELETE FROM equipment_types WHERE equipment_type_id='${obj.equipment_type_id}'`}
            )
            let equipmentTypesCopy = [...equipmentTypes];
            equipmentTypesCopy.splice(equipmentTypes.indexOf(obj), 1);
            setEquipmentTypes(equipmentTypesCopy);
        } catch {
            handleShowErrorDelete();
        }
    }

    async function updateEquipmentTypeHandler(obj: any) {
        let response = {data:{error: "Something went wrong"}};
        try {
            await axios.post(
                node_mysql,
                {query: `UPDATE equipment_types SET description='${obj.description}' WHERE equipment_type_id='${obj.equipment_type_id}'`}
            ).catch((error) => {
                alert(error.response.data.error);
                throw new Error();
            })
            alert("Вы успешно обновили данные");
            readHandler();
        } catch (e) {
        }
    }

    async function insertEquipmentTypeHandler(obj: any) {
        try {
            let response = await axios.post(
                node_mysql,
                {query: `INSERT INTO equipment_types(description) VALUES('${obj.description}')`}
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
        if (obj.equipment_type_id !== "") {
            expArray.push(`equipment_type_id='${obj.equipment_type_id}'`);
        }
        if (obj.description !== "") {
            expArray.push(`description like '%${obj.description}%'`);
        }

        if (expArray.length === 0) {
            readHandler();
        }
        else {
            await fetchEquipmentTypes( "SELECT equipment_type_id, description FROM equipment_types WHERE " + expArray.join(" AND "));
            setEquipmentTypesPage(1);
        }
    }

    async function readHandler() {
        await fetchEquipmentTypes("SELECT equipment_type_id, description FROM equipment_types");
    }

    async function fetchEquipmentTypes(query: string) {
        try {
            const response = await axios.post(
                node_mysql,
                {query: query}
            );
            setEquipmentTypes(response.data.result);
        } catch (e: unknown) {
        }
    }

    useEffect(() => {
        readHandler();
        return () => {
            setEquipmentTypes([]);
        }
    }, []);

    return { generatePropsForDBAccess }
}