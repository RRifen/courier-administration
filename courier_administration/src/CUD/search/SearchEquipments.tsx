import React, {useState} from "react";
import {Button, FormGroup, FormSelect} from "react-bootstrap";
import {useEquipmentsSelect} from "../../hooks/EquipmentsSelectHook";

interface SearchGroupProps {
    setPage: (page: number) => void
    searchHandler: (obj: any) => void
}

export function SearchEquipments({searchHandler}: SearchGroupProps) {

    let {equipmentTypes, setEquipmentTypes} = useEquipmentsSelect();
    let [equipment, setEquipment] = useState({equipment_id: "", equipment_type_id: "", courier_id: "", description: ""})

    return (
        <form className="standard p-3 rounded">
            <FormGroup className="row mt-2">
                <label htmlFor="equipmentTypeIdI" className="col-3 col-form-label text-end">Тип снаряжения:</label>
                <div className="col-sm-9">
                    <FormSelect id="equipmentTypeIdI"
                                value={equipment.equipment_type_id}
                                onChange={(e) => {
                                    e.preventDefault()
                                    setEquipment({
                                        ...equipment,
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
                <label htmlFor="equipmentId" className="col-3 col-form-label text-end">ID снаряжения:</label>
                <div className="col-sm-9 align-self-center">
                    <input value={equipment.equipment_id} type="number" className="form-control" id="equipmentId" placeholder="ID"
                           onChange={(e) => setEquipment({...equipment, equipment_id: e.target.value})}
                    />
                </div>
            </FormGroup>
            <FormGroup className="row mt-2">
                <label htmlFor="courierId" className="col-3 col-form-label text-end">ID курьера:</label>
                <div className="col-sm-9 align-self-center">
                    <input value={equipment.courier_id} type="text" className="form-control" id="courierId" placeholder="ID курьера"
                           onChange={(e) => setEquipment({...equipment, courier_id: e.target.value})}
                    />
                </div>
            </FormGroup>
            <FormGroup className="row mt-2 me-1">
                <Button id="button-addon2" className="offset-10 offset-sm-9 col-2 col-sm-3" onClick={() => searchHandler(equipment)}>Искать</Button>
            </FormGroup>
        </form>
    )
}