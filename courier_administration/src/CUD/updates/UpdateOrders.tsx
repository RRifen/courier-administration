import Modal from "react-bootstrap/Modal";
import {FormControl, FormGroup} from "react-bootstrap";
import Button from "react-bootstrap/Button";

interface modalProps {
    show: boolean
    handleClose: () => void
    updateHandler: (obj: object) => void
    setObj: (obj: any) => void
    obj: any
}

export function UpdateOrder({show, handleClose, updateHandler, obj, setObj}: modalProps) {
    obj.estimated_delivery_time = obj.estimated_delivery_time.toString().substring(0, 16);

    return (
        <div
            className="modal show"
            style={{display: 'block', position: 'initial'}}
        >
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton className="standard">
                    <Modal.Title>Обновить данные заказа</Modal.Title>
                </Modal.Header>

                <Modal.Body className="standard">
                    <form className="border-0">
                        <FormGroup className="mb-2">
                            <label htmlFor="courierIdInput" className="mb-1">ID курьера</label>
                            <FormControl type="text" id="courierIdInput"
                                         placeholder="Введите ID курьера"
                                         value={obj.courier_id}
                                         onChange={(e) => setObj({
                                             ...obj,
                                             courier_id: e.target.value
                                         })}
                            />
                        </FormGroup>
                        <FormGroup className="mb-2">
                            <label htmlFor="orderDeliveryAddressInput" className="mb-1">Адрес доставки</label>
                            <FormControl type="text" id="orderDeliveryAddressInput"
                                         placeholder="Введите адрес доставки"
                                         value={obj.delivery_address}
                                         onChange={(e) => setObj({
                                             ...obj,
                                             delivery_address: e.target.value
                                         })}
                            />
                        </FormGroup>
                        <FormGroup className="mb-2">
                            <label htmlFor="orderDeliveryTimeInput" className="mb-1">Время доставки</label>
                            <FormControl type="datetime-local" id="orderDeliveryTimeInput"
                                         placeholder="Введите время доставки"
                                         value={obj.estimated_delivery_time}
                                         onChange={(e) => setObj({
                                             ...obj,
                                             estimated_delivery_time: e.target.value
                                         })}
                            />
                        </FormGroup>
                        <FormGroup className="mb-2">
                            <label htmlFor="adminIdInput" className="mb-1">ID админа</label>
                            <FormControl type="text" id="adminIdInput"
                                         placeholder="Введите ID админа"
                                         value={obj.admin_id}
                                         onChange={(e) => setObj({
                                             ...obj,
                                             admin_id: e.target.value
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