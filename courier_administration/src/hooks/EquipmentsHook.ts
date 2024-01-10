import {useEffect, useState} from "react";
import DBAccessProps from "../data/Props";
import {equipmentsHeaders} from "../data/Headers";
import axios from "axios";
import {node_mysql} from "../data/API";

export function useEquipments() {
    const [equipments, setEquipments] = useState<object[]>([]);
    const [equipmentsPage, setEquipmentsPage] = useState(1);
    const [perEquipmentPage, setPerEquipmentPage] = useState(5);
    const [showErrorDelete, setShowErrorDelete] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [updateObj, setUpdateObj] = useState({equipment_id: "", equipment_type_id: "", courier_id: "", description: ""});

    const handleCloseErrorDelete = () => setShowErrorDelete(false);
    const handleShowErrorDelete = () => setShowErrorDelete(true);
    const handleCloseUpdateModal = () => setShowUpdateModal(false);
    const handleShowUpdateModal = () => setShowUpdateModal(true);

    function generatePropsForDBAccess(): DBAccessProps {
        let props = Object();
        props.page = equipmentsPage;
        props.perPage = perEquipmentPage;
        props.data = equipments;
        props.headers = equipmentsHeaders;
        props.searchHandler = searchHandler;
        props.setPage = setEquipmentsPage;
        props.setPerPage = setPerEquipmentPage;
        props.deleteHandler = deleteEquipmentHandler;
        props.updateHandlerCallback = updateEquipmentHandlerCallback;
        props.insertHandler = insertEquipmentHandler;
        props.handleCloseErrorDelete = handleCloseErrorDelete;
        props.showErrorDelete = showErrorDelete;
        props.updateObj = updateObj;
        props.setUpdateObj = setUpdateObj;
        props.updateHandler = updateEquipmentHandler;
        props.showUpdateModal = showUpdateModal;
        props.handleCloseUpdateModal = handleCloseUpdateModal;
        return props;
    }


    function updateEquipmentHandlerCallback(obj: any) {
        setUpdateObj({...obj});
        handleShowUpdateModal();
    }

    async function deleteEquipmentHandler(obj: any) {
        try {
            await axios.post(
                node_mysql,
                {query: `DELETE FROM equipments WHERE equipment_id='${obj.equipment_id}'`}
            )
            let equipmentsCopy = [...equipments];
            equipmentsCopy.splice(equipments.indexOf(obj), 1);
            setEquipments(equipmentsCopy);
        } catch {
            handleShowErrorDelete();
        }
    }

    async function updateEquipmentHandler(obj: any) {
        let response = {data:{error: "Something went wrong"}};
        try {
            await axios.post(
                node_mysql,
                {query: `UPDATE equipments SET courier_id='${obj.courier_id}', equipment_type_id='${obj.equipment_type_id}' WHERE equipment_id='${obj.equipment_id}'`}
            ).catch((error) => {
                alert(error.response.data.error);
                throw new Error();
            })
            alert("Вы успешно обновили данные");
            readHandler();
        } catch (e) {
        }
    }

    async function insertEquipmentHandler(obj: any) {
        try {
            let response = await axios.post(
                node_mysql,
                {query: `INSERT INTO equipments(equipment_type_id, courier_id) VALUES('${obj.equipment_type_id}', '${obj.courier_id}')`}
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
        if (obj.equipment_id !== "") {
            expArray.push(`equipment_id='${obj.equipment_id}'`);
        }
        if (obj.equipment_type_id !== "") {
            expArray.push(`equipment_type_id='${obj.equipment_type_id}'`);
        }
        if (obj.courier_id !== "") {
            expArray.push(`courier_id='${obj.courier_id}'`);
        }
        if (obj.description !== "") {
            expArray.push(`description like '%${obj.description}%'`);
        }

        if (expArray.length === 0) {
            readHandler();
        }
        else {
            await fetchEquipments( "SELECT equipment_id, equipment_type_id, courier_id, description FROM equipments JOIN equipment_types USING(equipment_type_id) WHERE " + expArray.join(" AND ") + " ORDER BY equipment_id ");
            setEquipmentsPage(1);
        }
    }

    async function readHandler() {
        await fetchEquipments("SELECT equipment_id, equipment_type_id, courier_id, description FROM equipments JOIN equipment_types USING(equipment_type_id) ORDER BY equipment_id");
    }

    async function fetchEquipments(query: string) {
        try {
            const response = await axios.post(
                node_mysql,
                {query: query}
            );
            setEquipments(response.data.result);
        } catch (e: unknown) {
        }
    }

    useEffect(() => {
        readHandler();
        return () => {
            setEquipments([]);
        }
    }, []);

    return { generatePropsForDBAccess }
}