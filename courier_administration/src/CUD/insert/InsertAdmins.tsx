import {Button, FormGroup} from "react-bootstrap";
import React, {useState} from "react";

interface InsertAdminsProps {
    insertHandler: (obj: any) => void
}

export function InsertAdmins({ insertHandler } : InsertAdminsProps) {

    let [newAdmin, setNewAdmin] = useState({login: "", password: "", issue_point_id: ""})

    return (
        <form className="standard p-3 rounded">
            <FormGroup className="row">
                <label htmlFor="adminLoginI" className="col-3 col-form-label text-end">Логин: </label>
                <div className="col-sm-9">
                    <input value={newAdmin.login} type="text" className="form-control" id="adminLoginI"
                           placeholder="Логин"
                           onChange={(e) => setNewAdmin({...newAdmin, login: e.target.value})}
                    />
                </div>
            </FormGroup>
            <FormGroup className="row mt-2">
                <label htmlFor="adminPasswordI" className="col-3 col-form-label text-end">Пароль: </label>
                <div className="col-sm-9">
                    <input value={newAdmin.password} type="text" className="form-control" id="adminPasswordI"
                           placeholder="Пароль"
                           onChange={(e) => setNewAdmin({...newAdmin, password: e.target.value})}
                    />
                </div>
            </FormGroup>
            <FormGroup className="row mt-2">
                <label htmlFor="issuePointIdI" className="col-3 col-form-label text-end">ID пункта:</label>
                <div className="col-sm-9">
                    <input value={newAdmin.issue_point_id} type="number" className="form-control" id="issuePointIdI"
                           placeholder="ID пункта"
                           onChange={(e) => setNewAdmin({...newAdmin, issue_point_id: e.target.value})}
                    />
                </div>
            </FormGroup>
            <FormGroup className="row mt-2 me-1">
                <Button id="button-addon2" className="offset-10 offset-sm-9 col-2 col-sm-3"
                        onClick={(e) => {
                            e.preventDefault();
                            insertHandler(newAdmin);
                        }}>Добавить</Button>
            </FormGroup>
        </form>
    )
}