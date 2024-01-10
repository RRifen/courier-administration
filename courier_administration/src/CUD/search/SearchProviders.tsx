import React, {useState} from "react";
import {Button, FormGroup} from "react-bootstrap";

interface SearchGroupProps {
    setPage: (page: number) => void
    searchHandler: (obj: any) => void
}

export function SearchProviders({searchHandler}: SearchGroupProps) {

    let [provider, setProvider] = useState({provider_id: "", provider_name: "", description: "", admin_id: ""})

    return (
        <form className="standard p-3 rounded">
            <FormGroup className="row">
                <label htmlFor="providerId" className="col-3 col-form-label text-end">ID поставщика:</label>
                <div className="col-sm-9 align-self-center">
                    <input value={provider.provider_id} type="number" className="form-control" id="providerId" placeholder="ID провайдера"
                           onChange={(e) => setProvider({...provider, provider_id: e.target.value})}
                    />
                </div>
            </FormGroup>
            <FormGroup className="row mt-2">
                <label htmlFor="providerName" className="col-3 col-form-label text-end">Название поставщика:</label>
                <div className="col-sm-9 align-self-center">
                    <input value={provider.provider_name} type="text" className="form-control" id="providerName" placeholder="Название поставщика"
                           onChange={(e) => setProvider({...provider, provider_name: e.target.value})}
                    />
                </div>
            </FormGroup>
            <FormGroup className="row mt-2">
                <label htmlFor="providerDescription" className="col-3 col-form-label text-end">Описание поставщика:</label>
                <div className="col-sm-9 align-self-center">
                    <input value={provider.description} type="text" className="form-control" id="providerDescription" placeholder="Описание поставщика"
                           onChange={(e) => setProvider({...provider, description: e.target.value})}
                    />
                </div>
            </FormGroup>
            <FormGroup className="row">
                <label htmlFor="adminId" className="col-3 col-form-label text-end">ID админа:</label>
                <div className="col-sm-9 align-self-center">
                    <input value={provider.admin_id} type="number" className="form-control" id="adminId" placeholder="ID админа"
                           onChange={(e) => setProvider({...provider, admin_id: e.target.value})}
                    />
                </div>
            </FormGroup>
            <FormGroup className="row mt-2 me-1">
                <Button id="button-addon2" className="offset-10 offset-sm-9 col-2 col-sm-3" onClick={() => searchHandler(provider)}>Искать</Button>
            </FormGroup>
        </form>
    )
}