import React, {useState} from "react";
import {Button, FormGroup} from "react-bootstrap";

interface InsertAdminsProps {
    insertHandler: (obj: any) => void
}

export function InsertProvidersU({ insertHandler } : InsertAdminsProps) {

    let [newProvider, setNewProvider] = useState({provider_name: "", description: "", admin_id: ""})

    return (
        <form className="standard p-3 rounded">
            <FormGroup className="row">
                <label htmlFor="providerNameInsert" className="col-3 col-form-label text-end">Название поставщика:</label>
                <div className="col-sm-9 align-self-center">
                    <input value={newProvider.provider_name} type="text" className="form-control" id="providerNameInsert"
                           placeholder="Название"
                           onChange={(e) => setNewProvider({...newProvider, provider_name: e.target.value})}
                    />
                </div>
            </FormGroup>
            <FormGroup className="row">
                <label htmlFor="providerDescriptionInsert" className="col-3 col-form-label text-end">Описание поставщика:</label>
                <div className="col-sm-9 align-self-center">
                    <input value={newProvider.description} type="text" className="form-control" id="providerDescriptionInsert"
                           placeholder="Описание"
                           onChange={(e) => setNewProvider({...newProvider, description: e.target.value})}
                    />
                </div>
            </FormGroup>
            <FormGroup className="row mt-2 me-1">
                <Button id="button-addon2" className="offset-10 offset-sm-9 col-2 col-sm-3"
                        onClick={(e) => {
                            e.preventDefault();
                            insertHandler(newProvider);
                        }}>Добавить</Button>
            </FormGroup>
        </form>
    )
}