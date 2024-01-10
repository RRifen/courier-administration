import Form from "react-bootstrap/Form";
import {Button, FormGroup, InputGroup, Row} from "react-bootstrap";
import React, {useState} from "react";

interface SearchGroupProps {
    setPage: (page: number) => void
    searchHandler: (obj: any) => void
}

export function SearchAdmins({searchHandler}: SearchGroupProps) {

    let [admin, setAdmin] = useState({admin_id: "", login: "", issue_point_id: ""})

    return (
        <form className="standard p-3 rounded">
            <FormGroup className="row">
                <label htmlFor="adminId" className="col-3 col-form-label text-end">ID админа:</label>
                <div className="col-sm-9">
                    <input value={admin.admin_id} type="number" className="form-control" id="adminId" placeholder="ID"
                           onChange={(e) => setAdmin({...admin, admin_id: e.target.value})}
                    />
                </div>
            </FormGroup>
            <FormGroup className="row mt-2">
                <label htmlFor="adminLogin" className="col-3 col-form-label text-end">Логин: </label>
                <div className="col-sm-9">
                    <input value={admin.login} type="text" className="form-control" id="adminLogin"
                           placeholder="Логин"
                           onChange={(e) => setAdmin({...admin, login: e.target.value})}
                    />
                </div>
            </FormGroup>
            <FormGroup className="row mt-2">
                <label htmlFor="issuePointId" className="col-3 col-form-label text-end">ID пункта:</label>
                <div className="col-sm-9">
                    <input value={admin.issue_point_id} type="number" className="form-control" id="issuePointId"
                           placeholder="ID пункта"
                           onChange={(e) => setAdmin({...admin, issue_point_id: e.target.value})}
                    />
                </div>
            </FormGroup>
            <FormGroup className="row mt-2 me-1">
                <Button id="button-addon2" className="offset-10 offset-sm-9 col-2 col-sm-3" onClick={() => searchHandler(admin)}>Искать</Button>
            </FormGroup>
        </form>
    )
}