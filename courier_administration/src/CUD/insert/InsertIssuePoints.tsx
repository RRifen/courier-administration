import React, {useState} from "react";
import {Button, FormGroup} from "react-bootstrap";

interface InsertAdminsProps {
    insertHandler: (obj: any) => void
}

export function InsertIssuePoints({ insertHandler } : InsertAdminsProps) {

    let [newIssuePoint, setNewIssuePoint] = useState({address: ""})

    return (
        <form className="standard p-3 rounded">
            <FormGroup className="row">
                <label htmlFor="issuePointAddress" className="col-3 col-form-label text-end">Адрес:</label>
                <div className="col-sm-9">
                    <input value={newIssuePoint.address} type="text" className="form-control" id="issuePointAddress"
                           placeholder="Адрес"
                           onChange={(e) => setNewIssuePoint({...newIssuePoint, address: e.target.value})}
                    />
                </div>
            </FormGroup>
            <FormGroup className="row mt-2 me-1">
                <Button id="button-addon2" className="offset-10 offset-sm-9 col-2 col-sm-3"
                        onClick={(e) => {
                            e.preventDefault();
                            insertHandler(newIssuePoint);
                        }}>Добавить</Button>
            </FormGroup>
        </form>
    )
}