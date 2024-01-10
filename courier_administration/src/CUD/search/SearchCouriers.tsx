import React, {useState} from "react";
import {Button, FormGroup} from "react-bootstrap";

interface SearchGroupProps {
    setPage: (page: number) => void
    searchHandler: (obj: any) => void
}

export function SearchCouriers({searchHandler}: SearchGroupProps) {

    let [courier, setCourier] = useState({courier_id: "", name: "", surname: "", patronymic: "", phone: "", violation_counter: ""})

    return (
        <form className="standard p-3 rounded">
            <FormGroup className="row">
                <label htmlFor="courierId" className="col-3 col-form-label text-end">ID курьера:</label>
                <div className="col-sm-9 align-self-center">
                    <input value={courier.courier_id} type="number" className="form-control" id="courierId" placeholder="ID"
                           onChange={(e) => setCourier({...courier, courier_id: e.target.value})}
                    />
                </div>
            </FormGroup>
            <FormGroup className="row mt-2">
                <label htmlFor="courierName" className="col-3 col-form-label text-end">Имя курьера:</label>
                <div className="col-sm-9 align-self-center">
                    <input value={courier.name} type="text" className="form-control" id="courierName" placeholder="Имя"
                           onChange={(e) => setCourier({...courier, name: e.target.value})}
                    />
                </div>
            </FormGroup>
            <FormGroup className="row mt-2">
                <label htmlFor="courierSurname" className="col-3 col-form-label text-end">Фамилия курьера:</label>
                <div className="col-sm-9 align-self-center">
                    <input value={courier.surname} type="text" className="form-control" id="courierSurname" placeholder="Фамилия"
                           onChange={(e) => setCourier({...courier, surname: e.target.value})}
                    />
                </div>
            </FormGroup>
            <FormGroup className="row mt-2">
                <label htmlFor="courierPatronymic" className="col-3 col-form-label text-end">Отчество курьера:</label>
                <div className="col-sm-9 align-self-center">
                    <input value={courier.patronymic} type="text" className="form-control" id="courierPatronymic" placeholder="Отчество"
                           onChange={(e) => setCourier({...courier, patronymic: e.target.value})}
                    />
                </div>
            </FormGroup>
            <FormGroup className="row mt-2">
                <label htmlFor="courierPhone" className="col-3 col-form-label text-end">Телефон курьера:</label>
                <div className="col-sm-9 align-self-center">
                    <input value={courier.phone} type="number" className="form-control" id="courierPhone"
                           placeholder="Телефон"
                           onChange={(e) => setCourier({...courier, phone: e.target.value})}
                    />
                </div>
            </FormGroup>
            <FormGroup className="row">
                <label htmlFor="courierViolationCounter" className="col-3 col-form-label text-end">Число нарушений:</label>
                <div className="col-sm-9 align-self-center">
                    <input value={courier.violation_counter} type="number" className="form-control" id="courierViolationCounter" placeholder="Число нарушений"
                           onChange={(e) => setCourier({...courier, violation_counter: e.target.value})}
                    />
                </div>
            </FormGroup>
            <FormGroup className="row mt-2 me-1">
                <Button id="button-addon2" className="offset-10 offset-sm-9 col-2 col-sm-3" onClick={() => searchHandler(courier)}>Искать</Button>
            </FormGroup>
        </form>
    )
}