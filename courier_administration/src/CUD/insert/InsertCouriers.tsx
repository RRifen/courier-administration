import React, {useState} from "react";
import {Button, FormGroup} from "react-bootstrap";

interface InsertAdminsProps {
    insertHandler: (obj: any) => void
}

export function InsertCouriers({ insertHandler } : InsertAdminsProps) {

    let [newCourier, setNewCourier] = useState({name: "", surname: "", patronymic: "", phone: "", violation_counter: ""})

    return (
        <form className="standard p-3 rounded">
            <FormGroup className="row">
                <label htmlFor="courierNameI" className="col-3 col-form-label text-end">Имя: </label>
                <div className="col-sm-9">
                    <input value={newCourier.name} type="text" className="form-control" id="courierNameI"
                           placeholder="Имя"
                           onChange={(e) => setNewCourier({...newCourier, name: e.target.value})}
                    />
                </div>
            </FormGroup>
            <FormGroup className="row mt-2">
                <label htmlFor="courierSurnameI" className="col-3 col-form-label text-end">Фамилия: </label>
                <div className="col-sm-9">
                    <input value={newCourier.surname} type="text" className="form-control" id="courierSurnameI"
                           placeholder="Фамилия"
                           onChange={(e) => setNewCourier({...newCourier, surname: e.target.value})}
                    />
                </div>
            </FormGroup>
            <FormGroup className="row mt-2">
                <label htmlFor="courierPatronymicI" className="col-3 col-form-label text-end">Отчество: </label>
                <div className="col-sm-9">
                    <input value={newCourier.patronymic} type="text" className="form-control" id="courierPatronymicI"
                           placeholder="Отчество"
                           onChange={(e) => setNewCourier({...newCourier, patronymic: e.target.value})}
                    />
                </div>
            </FormGroup>
            <FormGroup className="row mt-2">
                <label htmlFor="courierPhoneI" className="col-3 col-form-label text-end">Телефон: </label>
                <div className="col-sm-9">
                    <input value={newCourier.phone} type="text" className="form-control" id="courierPhoneI"
                           placeholder="Телефон"
                           onChange={(e) => setNewCourier({...newCourier, phone: e.target.value})}
                    />
                </div>
            </FormGroup>
            <FormGroup className="row mt-2">
                <label htmlFor="courierViolationCounterI" className="col-3 col-form-label text-end">Число нарушений: </label>
                <div className="col-sm-9 align-self-center">
                    <input value={newCourier.violation_counter} type="text" className="form-control" id="courierViolationCounterI"
                           placeholder="Число нарушений"
                           onChange={(e) => setNewCourier({...newCourier, violation_counter: e.target.value})}
                    />
                </div>
            </FormGroup>
            <FormGroup className="row mt-2 me-1">
                <Button id="button-addon2" className="offset-10 offset-sm-9 col-2 col-sm-3"
                        onClick={(e) => {
                            e.preventDefault();
                            insertHandler(newCourier);
                        }}>Добавить</Button>
            </FormGroup>
        </form>
    )
}