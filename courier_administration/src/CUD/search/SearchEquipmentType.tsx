import React, {useState} from "react";
import {Button, FormGroup} from "react-bootstrap";

interface SearchGroupProps {
    setPage: (page: number) => void
    searchHandler: (obj: any) => void
}

export function SearchEquipmentTypes({searchHandler}: SearchGroupProps) {

    let [equipmentType, setEquipmentType] = useState({equipment_type_id: "", description: ""})

    return (
        <form className="standard p-3 rounded">
            <FormGroup className="row">
                <label htmlFor="equipmentTypeIdS" className="col-3 col-form-label text-end">ID типа оборудования:</label>
                <div className="col-sm-9 align-self-center">
                    <input value={equipmentType.equipment_type_id} type="number" className="form-control" id="equipmentTypeIdS" placeholder="ID"
                           onChange={(e) => setEquipmentType({...equipmentType, equipment_type_id: e.target.value})}
                    />
                </div>
            </FormGroup>
            <FormGroup className="row mt-2">
                <label htmlFor="EquipmentTypeDescriptionS" className="col-3 col-form-label text-end">Описание:</label>
                <div className="col-sm-9 align-self-center">
                    <input value={equipmentType.description} type="text" className="form-control" id="EquipmentTypeDescriptionS" placeholder="Описание"
                           onChange={(e) => setEquipmentType({...equipmentType, description: e.target.value})}
                    />
                </div>
            </FormGroup>
            <FormGroup className="row mt-2 me-1">
                <Button id="button-addon2" className="offset-10 offset-sm-9 col-2 col-sm-3" onClick={() => searchHandler(equipmentType)}>Искать</Button>
            </FormGroup>
        </form>
    )
}