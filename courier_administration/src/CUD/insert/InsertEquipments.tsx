import React, {useState} from "react";
import {Button, FormGroup, FormSelect} from "react-bootstrap";
import {useEquipmentsSelect} from "../../hooks/EquipmentsSelectHook";

interface InsertAdminsProps {
    insertHandler: (obj: any) => void
}

export function InsertEquipments({insertHandler}: InsertAdminsProps) {
    let [newEquipment, setNewEquipment] = useState({equipment_type_id: "", courier_id: ""})
    let {equipmentTypes, setEquipmentTypes} = useEquipmentsSelect();

    return (
        <form className="standard p-3 rounded">
            <FormGroup className="row mt-2">
                <label htmlFor="equipmentTypeIdI" className="col-3 col-form-label text-end">Тип экипировки:</label>
                <div className="col-sm-9">
                    <FormSelect id="equipmentTypeIdI"
                                value={newEquipment.equipment_type_id}
                                onChange={(e) => {
                                    e.preventDefault()
                                    setNewEquipment({
                                        ...newEquipment,
                                        equipment_type_id: e.target.value
                                    })
                                }}>
                        <option value="">Выберите тип снаряжения</option>
                        {equipmentTypes.map((value) => {
                            return (
                                <option key={value.equipment_type_id}
                                        value={value.equipment_type_id}>{value.description}</option>
                            )
                        })}
                    </FormSelect>
                </div>
            </FormGroup>
            <FormGroup className="row mt-2">
                <label htmlFor="courierIdI" className="col-3 col-form-label text-end">ID курьера: </label>
                <div className="col-sm-9">
                    <input value={newEquipment.courier_id} type="number" className="form-control" id="courierIdI"
                           placeholder="ID курьера"
                           onChange={(e) => setNewEquipment({...newEquipment, courier_id: e.target.value})}
                    />
                </div>
            </FormGroup>
            <FormGroup className="row mt-2 me-1">
                <Button id="button-addon2" className="offset-10 offset-sm-9 col-2 col-sm-3"
                        onClick={(e) => {
                            e.preventDefault();
                            insertHandler(newEquipment);
                        }}>Добавить</Button>
            </FormGroup>
        </form>
    )
}