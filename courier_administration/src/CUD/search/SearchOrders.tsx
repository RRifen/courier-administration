import React, {useState} from "react";
import {Button, FormGroup} from "react-bootstrap";

interface SearchGroupProps {
    setPage: (page: number) => void
    searchHandler: (obj: any) => void
}

export function SearchOrders({searchHandler}: SearchGroupProps) {

    let [order, setOrder] = useState({order_id: "", courier_id: "", admin_id: "", delivery_address: ""})

    return (
        <form className="standard p-3 rounded">
            <FormGroup className="row">
                <label htmlFor="orderId" className="col-3 col-form-label text-end">ID заказа:</label>
                <div className="col-sm-9 align-self-center">
                    <input value={order.order_id} type="number" className="form-control" id="orderId" placeholder="ID заказа"
                           onChange={(e) => setOrder({...order, order_id: e.target.value})}
                    />
                </div>
            </FormGroup>
            <FormGroup className="row mt-2">
                <label htmlFor="courierId" className="col-3 col-form-label text-end">ID курьера:</label>
                <div className="col-sm-9 align-self-center">
                    <input value={order.courier_id} type="number" className="form-control" id="courierId" placeholder="ID курьера"
                           onChange={(e) => setOrder({...order, courier_id: e.target.value})}
                    />
                </div>
            </FormGroup>
            <FormGroup className="row mt-2">
                <label htmlFor="adminId" className="col-3 col-form-label text-end">ID админа:</label>
                <div className="col-sm-9 align-self-center">
                    <input value={order.admin_id} type="number" className="form-control" id="adminId" placeholder="ID админа"
                           onChange={(e) => setOrder({...order, admin_id: e.target.value})}
                    />
                </div>
            </FormGroup>
            <FormGroup className="row mt-2">
                <label htmlFor="orderDeliveryAddress" className="col-3 col-form-label text-end">Адрес доставки:</label>
                <div className="col-sm-9 align-self-center">
                    <input value={order.delivery_address} type="text" className="form-control" id="orderDeliveryAddress" placeholder="Адрес доставки"
                           onChange={(e) => setOrder({...order, delivery_address: e.target.value})}
                    />
                </div>
            </FormGroup>
            <FormGroup className="row mt-2 me-1">
                <Button id="button-addon2" className="offset-10 offset-sm-9 col-2 col-sm-3" onClick={() => searchHandler(order)}>Искать</Button>
            </FormGroup>
        </form>
    )
}