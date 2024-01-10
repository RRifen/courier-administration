import React, {useState} from "react";
import {Button, FormGroup} from "react-bootstrap";

interface InsertAdminsProps {
    insertHandler: (obj: any) => void
}

export function InsertReportTypes({insertHandler}: InsertAdminsProps) {

    let [newReportType, setNewReportType] = useState({description: ""})

    return (
        <form className="standard p-3 rounded">
            <FormGroup className="row">
                <label htmlFor="reportTypeDescriptionI" className="col-3 col-form-label text-end">Описание:</label>
                <div className="col-sm-9">
                    <input value={newReportType.description} type="text" className="form-control" id="reportTypeDescriptionI"
                           placeholder="Описание"
                           onChange={(e) => setNewReportType({...newReportType, description: e.target.value})}
                    />
                </div>
            </FormGroup>
            <FormGroup className="row mt-2 me-1">
                <Button id="button-addon2" className="offset-10 offset-sm-9 col-2 col-sm-3"
                        onClick={(e) => {
                            e.preventDefault();
                            insertHandler(newReportType);
                        }}>Добавить</Button>
            </FormGroup>
        </form>
    )
}