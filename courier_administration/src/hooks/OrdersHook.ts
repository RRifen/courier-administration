import {useEffect, useState} from "react";
import DBAccessProps from "../data/Props";
import {ordersHeaders} from "../data/Headers";
import axios from "axios";
import {node_mysql} from "../data/API";

export function useOrders() {
    const [orders, setOrders] = useState<object[]>([]);
    const [ordersPage, setOrdersPage] = useState(1);
    const [perOrderPage, setPerOrderPage] = useState(5);
    const [showErrorDelete, setShowErrorDelete] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [updateObj, setUpdateObj] = useState({order_id: "", courier_id: "", admin_id: "", delivery_address: "", estimated_delivery_time: ""});

    const handleCloseErrorDelete = () => setShowErrorDelete(false);
    const handleShowErrorDelete = () => setShowErrorDelete(true);
    const handleCloseUpdateModal = () => setShowUpdateModal(false);
    const handleShowUpdateModal = () => setShowUpdateModal(true);

    function generatePropsForDBAccess(): DBAccessProps {
        let props = Object();
        props.page = ordersPage;
        props.perPage = perOrderPage;
        props.data = orders;
        props.headers = ordersHeaders;
        props.searchHandler = searchHandler;
        props.setPage = setOrdersPage;
        props.setPerPage = setPerOrderPage;
        props.deleteHandler = deleteOrderHandler;
        props.updateHandlerCallback = updateOrderHandlerCallback;
        props.insertHandler = insertOrderHandler;
        props.handleCloseErrorDelete = handleCloseErrorDelete;
        props.showErrorDelete = showErrorDelete;
        props.updateObj = updateObj;
        props.setUpdateObj = setUpdateObj;
        props.updateHandler = updateOrderHandler;
        props.showUpdateModal = showUpdateModal;
        props.handleCloseUpdateModal = handleCloseUpdateModal;
        return props;
    }


    function updateOrderHandlerCallback(obj: any) {
        setUpdateObj({...obj});
        handleShowUpdateModal();
    }

    async function deleteOrderHandler(obj: any) {
        try {
            await axios.post(
                node_mysql,
                {query: `DELETE FROM orders WHERE order_id='${obj.order_id}'`}
            )
            let ordersCopy = [...orders];
            ordersCopy.splice(orders.indexOf(obj), 1);
            setOrders(ordersCopy);
        } catch {
            handleShowErrorDelete();
        }
    }

    async function updateOrderHandler(obj: any) {
        try {
            await axios.post(
                node_mysql,
                {query: `UPDATE orders SET courier_id='${obj.courier_id}', delivery_address='${obj.delivery_address}', estimated_delivery_time='${obj.estimated_delivery_time}', admin_id='${obj.admin_id}' WHERE order_id='${obj.order_id}'`}
            ).catch((error) => {
                alert(error.response.data.error);
                throw new Error();
            })
            alert("Вы успешно обновили данные");
            readHandler();
        } catch (e) {
        }
    }

    async function insertOrderHandler(obj: any) {
        try {
            let response = await axios.post(
                node_mysql,
                {query: `INSERT INTO orders(delivery_address, estimated_delivery_time) VALUES('${obj.delivery_address}', '${obj.estimated_delivery_time}')`}
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
        if (obj.order_id !== "") {
            expArray.push(`order_id='${obj.order_id}'`);
        }
        if (obj.courier_id !== "") {
            expArray.push(`courier_id='${obj.courier_id}'`)
        }
        if (obj.delivery_address !== "") {
            expArray.push(`delivery_address like '%${obj.delivery_address}%'`)
        }
        if (obj.admin_id !== "") {
            expArray.push(`admin_id='${obj.admin_id}'`);
        }

        if (expArray.length === 0) {
            readHandler();
        }
        else {
            await fetchOrders( "SELECT order_id, courier_id, delivery_address, estimated_delivery_time, admin_id FROM orders WHERE " + expArray.join(" AND "));
        }
    }

    async function readHandler() {
        await fetchOrders("SELECT order_id, courier_id, delivery_address, estimated_delivery_time, admin_id FROM orders");
    }

    async function fetchOrders(query: string) {
        try {
            const response = await axios.post(
                node_mysql,
                {query: query}
            );
            console.log(response.data.result)
            setOrders(response.data.result);
        } catch (e: unknown) {
        }
    }

    useEffect(() => {
        readHandler();
        return () => {
            setOrders([]);
        }
    }, []);

    return { generatePropsForDBAccess }
}