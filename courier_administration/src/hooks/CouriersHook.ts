import {useEffect, useState} from "react";
import DBAccessProps from "../data/Props";
import {couriersHeaders} from "../data/Headers";
import axios from "axios";
import {node_mysql} from "../data/API";

export function useCouriers() {
    const [couriers, setCouriers] = useState<object[]>([]);
    const [couriersPage, setCouriersPage] = useState(1);
    const [perCourierPage, setPerCourierPage] = useState(5);
    const [showErrorDelete, setShowErrorDelete] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [updateObj, setUpdateObj] = useState({courier_id: "", surname: "", name: "", patronymic: "", violation_counter: "", phone: ""});

    const handleCloseErrorDelete = () => setShowErrorDelete(false);
    const handleShowErrorDelete = () => setShowErrorDelete(true);
    const handleCloseUpdateModal = () => setShowUpdateModal(false);
    const handleShowUpdateModal = () => setShowUpdateModal(true);

    function generatePropsForDBAccess(): DBAccessProps {
        let props = Object();
        props.page = couriersPage;
        props.perPage = perCourierPage;
        props.data = couriers;
        props.headers = couriersHeaders;
        props.searchHandler = searchHandler;
        props.setPage = setCouriersPage;
        props.setPerPage = setPerCourierPage;
        props.deleteHandler = deleteCourierHandler;
        props.updateHandlerCallback = updateCourierHandlerCallback;
        props.insertHandler = insertCourierHandler;
        props.handleCloseErrorDelete = handleCloseErrorDelete;
        props.showErrorDelete = showErrorDelete;
        props.updateObj = updateObj;
        props.setUpdateObj = setUpdateObj;
        props.updateHandler = updateCourierHandler;
        props.showUpdateModal = showUpdateModal;
        props.handleCloseUpdateModal = handleCloseUpdateModal;
        return props;
    }


    function updateCourierHandlerCallback(obj: any) {
        setUpdateObj({...obj});
        handleShowUpdateModal();
    }

    async function deleteCourierHandler(obj: any) {
        try {
            await axios.post(
                node_mysql,
                {query: `DELETE FROM couriers WHERE courier_id='${obj.courier_id}'`}
            )
            let couriersCopy = [...couriers];
            couriersCopy.splice(couriers.indexOf(obj), 1);
            setCouriers(couriersCopy);
        } catch {
            handleShowErrorDelete();
        }
    }

    async function updateCourierHandler(obj: any) {
        let response = {data:{error: "Something went wrong"}};
        try {
            await axios.post(
                node_mysql,
                {query: `UPDATE couriers SET surname='${obj.surname}', name='${obj.name}', patronymic='${obj.patronymic}', violation_counter='${obj.violation_counter}', phone='${obj.phone}' WHERE courier_id='${obj.courier_id}'`}
            ).catch((error) => {
                alert(error.response.data.error);
                throw new Error();
            })
            alert("Вы успешно обновили данные");
            readHandler();
        } catch (e) {
        }
    }

    async function insertCourierHandler(obj: any) {
        try {
            let response = await axios.post(
                node_mysql,
                {query: `INSERT INTO couriers(surname, name, patronymic, phone, violation_counter) VALUES('${obj.surname}', '${obj.name}', '${obj.patronymic}', '${obj.phone}', '${obj.violation_counter}')`}
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
        if (obj.surname !== "") {
            expArray.push(`surname like '%${obj.surname}%'`);
        }
        if (obj.name !== "") {
            expArray.push(`name like '%${obj.name}%'`);
        }
        if (obj.patronymic !== "") {
            expArray.push(`patronymic like '%${obj.patronymic}%'`);
        }
        if (obj.courier_id !== "") {
            expArray.push(`courier_id='${obj.courier_id}'`);
        }
        if (obj.phone !== "") {
            expArray.push(`phone='${obj.phone}'`);
        }

        if (expArray.length === 0) {
            readHandler();
        }
        else {
            await fetchCouriers( "SELECT courier_id, surname, name, patronymic, latitude, longitude, phone, violation_counter FROM couriers WHERE " + expArray.join(" AND "));
        }
    }

    async function readHandler() {
        await fetchCouriers("SELECT courier_id, surname, name, patronymic, latitude, longitude, phone, violation_counter FROM couriers");
    }

    async function fetchCouriers(query: string) {
        try {
            const response = await axios.post(
                node_mysql,
                {query: query}
            );
            setCouriers(response.data.result);
        } catch (e: unknown) {
        }
    }

    useEffect(() => {
        readHandler();
        return () => {
            setCouriers([]);
        }
    }, []);

    return { generatePropsForDBAccess }
}