import {useEffect, useState} from "react";
import DBAccessProps from "../data/Props";
import {goodsHeaders} from "../data/Headers";
import axios from "axios";
import {node_mysql} from "../data/API";

export function useGoods() {
    const [goods, setGoods] = useState<object[]>([]);
    const [goodPage, setGoodPage] = useState(1);
    const [perGoodPage, setPerGoodPage] = useState(5);
    const [showErrorDelete, setShowErrorDelete] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [updateObj, setUpdateObj] = useState({good_id: "", provider_id: "", good_type_id: "", goods_description: "", count: ""});

    const handleCloseErrorDelete = () => setShowErrorDelete(false);
    const handleShowErrorDelete = () => setShowErrorDelete(true);
    const handleCloseUpdateModal = () => setShowUpdateModal(false);
    const handleShowUpdateModal = () => setShowUpdateModal(true);

    function generatePropsForDBAccess(): DBAccessProps {
        let props = Object();
        props.page = goodPage;
        props.perPage = perGoodPage;
        props.data = goods;
        props.headers = goodsHeaders;
        props.searchHandler = searchHandler;
        props.setPage = setGoodPage;
        props.setPerPage = setPerGoodPage;
        props.deleteHandler = deleteGoodHandler;
        props.updateHandlerCallback = updateGoodHandlerCallback;
        props.insertHandler = insertGoodHandler;
        props.handleCloseErrorDelete = handleCloseErrorDelete;
        props.showErrorDelete = showErrorDelete;
        props.updateObj = updateObj;
        props.setUpdateObj = setUpdateObj;
        props.updateHandler = updateGoodHandler;
        props.showUpdateModal = showUpdateModal;
        props.handleCloseUpdateModal = handleCloseUpdateModal;
        return props;
    }


    function updateGoodHandlerCallback(obj: any) {
        setUpdateObj({...obj});
        handleShowUpdateModal();
    }

    async function deleteGoodHandler(obj: any) {
        try {
            await axios.post(
                node_mysql,
                {query: `DELETE FROM goods WHERE good_id='${obj.good_id}' and provider_id='${obj.provider_id}'`}
            )
            let goodsCopy = [...goods];
            goodsCopy.splice(goods.indexOf(obj), 1);
            setGoods(goodsCopy);
        } catch {
            handleShowErrorDelete();
        }
    }

    async function updateGoodHandler(obj: any) {
        let response = {data:{error: "Something went wrong"}};
        try {
            await axios.post(
                node_mysql,
                {query: `UPDATE goods SET good_type_id='${obj.good_type_id}', description='${obj.goods_description}', count='${obj.count}' WHERE good_id='${obj.good_id}' AND provider_id='${obj.provider_id}'`}
            ).catch((error) => {
                alert(error.response.data.error);
                throw new Error();
            })
            alert("Вы успешно обновили данные");
            readHandler();
        } catch (e) {
        }
    }

    async function insertGoodHandler(obj: any) {
        try {
            let response = await axios.post(
                node_mysql,
                {query: `INSERT INTO goods(good_id, provider_id, good_type_id, description, count) VALUES('${obj.good_id}', '${obj.provider_id}', '${obj.good_type_id}', '${obj.goods_description}', ${obj.count})`}
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
        if (obj.good_id !== "") {
            expArray.push(`good_id='${obj.good_id}'`);
        }
        if (obj.provider_id !== "") {
            expArray.push(`provider_id='${obj.provider_id}'`);
        }
        if (obj.good_type_id !== "") {
            expArray.push(`good_type_id='${obj.good_type_id}'`);
        }
        if (obj.goods_description !== "") {
            expArray.push(`goods.description like '%${obj.goods_description}%'`);
        }
        if (obj.count !== "") {
            expArray.push(`count='${obj.count}'`);
        }

        if (expArray.length === 0) {
            await readHandler();
        }
        else {
            await fetchGoods( "SELECT good_id, goods.description as goods_description, count, provider_id, good_type_id, good_types.description as good_types_description FROM goods JOIN good_types USING(good_type_id) WHERE " + expArray.join(" AND "));
        }
    }

    async function readHandler() {
        return await fetchGoods("SELECT good_id, goods.description as goods_description, count, provider_id, good_type_id, good_types.description as good_types_description FROM goods JOIN good_types USING(good_type_id)");
    }

    async function fetchGoods(query: string) {
        try {
            const response = await axios.post(
                node_mysql,
                {query: query}
            );
            setGoods(response.data.result);
        } catch (e: unknown) {
        }
    }

    useEffect(() => {
        readHandler();
        return () => {
            setGoods([]);
        }
    }, []);

    return { generatePropsForDBAccess }
}