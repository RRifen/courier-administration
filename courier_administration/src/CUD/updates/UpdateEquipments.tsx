import Modal from "react-bootstrap/Modal";
import {FormControl, FormGroup, FormSelect} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import React from "react";
import {useEquipmentsSelect} from "../../hooks/EquipmentsSelectHook";

interface modalProps {
    show: boolean
    handleClose: () => void
    updateHandler: (obj: object) => void
    setObj: (obj: any) => void
    obj: any
}

export function UpdateEquipment({show, handleClose, updateHandler, obj, setObj}: modalProps) {
    let {equipmentTypes} = useEquipmentsSelect();

    return (
        <div
            className="modal show"
            style={{display: 'block', position: 'initial'}}
        >
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton className="standard">
                    <Modal.Title>Обновить данные об экипровке</Modal.Title>
                </Modal.Header>

                <Modal.Body className="standard">
                    <form className="border-0">
                        <FormGroup className="mb-2">
                            <label htmlFor="equipmentTypeIdI" className="col-form-label">Тип
                                экипировки</label>
                            <div>
                                <FormSelect id="equipmentTypeIdI"
                                            value={obj.equipment_type_id}
                                            onChange={(e) => {
                                                e.preventDefault()
                                                setObj({
                                                    ...obj,
                                                    equipment_type_id: e.target.value
                                                })
                                            }}>
                                    {equipmentTypes.map((value) => {
                                        return (
                                            <option key={value.equipment_type_id}
                                                    value={value.equipment_type_id}>{value.description}</option>
                                        )
                                    })}
                                </FormSelect>
                            </div>
                        </FormGroup>
                        <FormGroup className="mb-2">
                            <label htmlFor="courierId" className="mb-1">ID курьера</label>
                            <FormControl type="number" id="courierId"
                                         placeholder="Введите ID курьера"
                                         value={obj.courier_id}
                                         onChange={(e) => setObj({
                                             ...obj,
                                             courier_id: e.target.value
                                         })}
                            />
                        </FormGroup>
                        <button type="submit" className="btn btn-primary my-2" onClick={(e) => {
                            e.preventDefault();
                            updateHandler(obj);
                            handleClose();
                        }
                        }>Обновить
                        </button>
                    </form>
                </Modal.Body>

                <Modal.Footer className="standard">
                    <Button variant="primary" onClick={handleClose}>Закрыть</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}