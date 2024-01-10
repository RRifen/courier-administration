import {useEffect, useState} from "react";
import DBAccessProps from "../data/Props";
import {providersHeaders} from "../data/Headers";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import {node_mysql} from "../data/API";


interface JwtBody {
    id: number
}

export function useProvidersU() {
    const [providers, setProviders] = useState<object[]>([]);
    const [providerPage, setProviderPage] = useState(1);
    const [perProviderPage, setPerProviderPage] = useState(5);
    const [showErrorDelete, setShowErrorDelete] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [updateObj, setUpdateObj] = useState({provider_id: "", provider_name: "", description: "", admin_id: ""});

    const handleCloseErrorDelete = () => setShowErrorDelete(false);
    const handleShowErrorDelete = () => setShowErrorDelete(true);
    const handleCloseUpdateModal = () => setShowUpdateModal(false);
    const handleShowUpdateModal = () => setShowUpdateModal(true);

    function generatePropsForDBAccess(): DBAccessProps {
        let props = Object();
        props.page = providerPage;
        props.perPage = perProviderPage;
        props.data = providers;
        props.headers = providersHeaders;
        props.searchHandler = searchHandler;
        props.setPage = setProviderPage;
        props.setPerPage = setPerProviderPage;
        props.deleteHandler = deleteProviderHandler;
        props.updateHandlerCallback = updateProviderHandlerCallback;
        props.insertHandler = insertProviderHandler;
        props.handleCloseErrorDelete = handleCloseErrorDelete;
        props.showErrorDelete = showErrorDelete;
        props.updateObj = updateObj;
        props.setUpdateObj = setUpdateObj;
        props.updateHandler = updateProviderHandler;
        props.showUpdateModal = showUpdateModal;
        props.handleCloseUpdateModal = handleCloseUpdateModal;
        return props;
    }


    function updateProviderHandlerCallback(obj: any) {
        setUpdateObj({...obj});
        handleShowUpdateModal();
    }

    async function deleteProviderHandler(obj: any) {
        try {
            {/*
             // @ts-ignore */}
            let id = jwtDecode<JwtBody>(localStorage.getItem('token')).id;
            await axios.post(
                node_mysql,
                {query: `DELETE FROM providers WHERE provider_id='${obj.provider_id}'  AND admin_id='${id}'`}
            )
            let providersCopy = [...providers];
            providersCopy.splice(providers.indexOf(obj), 1);
            setProviders(providersCopy);
        } catch {
            handleShowErrorDelete();
        }
    }


    async function updateProviderHandler(obj: any) {
        let response = {data:{error: "Something went wrong"}};
        try {
            {/*
             // @ts-ignore */}
            let id = jwtDecode<JwtBody>(localStorage.getItem('token')).id;
            await axios.post(
                node_mysql,
                {query: `UPDATE providers SET provider_name='${obj.provider_name}', description='${obj.description}', admin_id='${obj.admin_id}' WHERE provider_id='${obj.provider_id}' AND admin_id='${id}'`}
            ).catch((error) => {
                alert(error.response.data.error);
                throw new Error();
            })
            alert("Вы успешно обновили данные");
            readHandler();
        } catch (e) {
        }
    }

    async function insertProviderHandler(obj: any) {
        try {
            {/*
             // @ts-ignore */}
            let id = jwtDecode<JwtBody>(localStorage.getItem('token')).id;
            let response = await axios.post(
                node_mysql,
                {query: `INSERT INTO providers(provider_name, description, admin_id) VALUES('${obj.provider_name}', '${obj.description}', '${id}')`}
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
        if (obj.provider_id !== "") {
            expArray.push(`provider_id='${obj.provider_id}'`);
        }
        if (obj.provider_name !== "") {
            expArray.push(`provider_name like '%${obj.provider_name}%'`);
        }
        if (obj.description !== "") {
            expArray.push(`description like '%${obj.description}%'`);
        }

        if (expArray.length === 0) {
            await readHandler();
        }
        else {
            {/*
             // @ts-ignore */}
            let id = jwtDecode<JwtBody>(localStorage.getItem('token')).id;
            await fetchProviders( `SELECT provider_id, provider_name, description, admin_id FROM providers WHERE admin_id='${id}' AND ` + expArray.join(" AND "));
        }
    }

    async function readHandler() {
        {/*
             // @ts-ignore */}
        let id = jwtDecode<JwtBody>(localStorage.getItem('token')).id;
        await fetchProviders(`SELECT provider_id, provider_name, description, admin_id FROM providers WHERE admin_id='${id}'`);
    }

    async function fetchProviders(query: string) {
        try {
            const response = await axios.post(
                node_mysql,
                {query: query}
            );
            setProviders(response.data.result);
        } catch (e: unknown) {
        }
    }

    useEffect(() => {
        readHandler();
        return () => {
            setProviders([]);
        }
    }, []);

    return { generatePropsForDBAccess }
}