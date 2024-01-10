import React, {useState} from "react";
import {Button, FormGroup} from "react-bootstrap";

interface InsertAdminsProps {
    insertHandler: (obj: any) => void
}

export function InsertEquipmentTypes({insertHandler}: InsertAdminsProps) {

    let [newEquipmentType, setNewEquipmentType] = useState({description: ""})

    return (
        <form className="standard p-3 rounded">
            <FormGroup className="row">
                <label htmlFor="equipmentTypeDescriptionI" className="col-3 col-form-label text-end">Описание:</label>
                <div className="col-sm-9">
                    <input value={newEquipmentType.description} type="text" className="form-control" id="equipmentTypeDescriptionI"
                           placeholder="Описание"
                           onChange={(e) => setNewEquipmentType({...newEquipmentType, description: e.target.value})}
                    />
                </div>
            </FormGroup>
            <FormGroup className="row mt-2 me-1">
                <Button id="button-addon2" className="offset-10 offset-sm-9 col-2 col-sm-3"
                        onClick={(e) => {
                            e.preventDefault();
                            insertHandler(newEquipmentType);
                        }}>Добавить</Button>
            </FormGroup>
        </form>
    )
}