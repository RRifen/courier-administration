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

export function UpdateCourier({show, handleClose, updateHandler, obj, setObj}: modalProps) {

    return (
        <div
            className="modal show"
            style={{display: 'block', position: 'initial'}}
        >
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton className="standard">
                    <Modal.Title>Обновить данные о курьере</Modal.Title>
                </Modal.Header>

                <Modal.Body className="standard">
                    <form className="border-0">
                        <FormGroup className="mb-2">
                            <label htmlFor="nameCourierInput" className="mb-1">Имя</label>
                            <FormControl type="text" id="nameCourierInput"
                                         placeholder="Введите имя"
                                         value={obj.name}
                                         onChange={(e) => setObj({
                                             ...obj,
                                             name: e.target.value
                                         })}
                            />
                        </FormGroup>
                        <FormGroup className="mb-2">
                            <label htmlFor="surnameCourierInput" className="mb-1">Фамилия</label>
                            <FormControl type="text" id="surnameCourierInput"
                                         placeholder="Введите фамилию"
                                         value={obj.surname}
                                         onChange={(e) => setObj({
                                             ...obj,
                                             surname: e.target.value
                                         })}
                            />
                        </FormGroup>
                        <FormGroup className="mb-2">
                            <label htmlFor="patronymicCourierInput" className="mb-1">Отчество</label>
                            <FormControl type="text" id="patronymicCourierInput"
                                         placeholder="Введите отчество"
                                         value={obj.patronymic}
                                         onChange={(e) => setObj({
                                             ...obj,
                                             patronymic: e.target.value
                                         })}
                            />
                        </FormGroup>
                        <FormGroup className="mb-2">
                            <label htmlFor="phoneCourierInput" className="mb-1">Номер телефона</label>
                            <FormControl type="number" id="phoneCourierInput"
                                         placeholder="Введите номер телефона"
                                         value={obj.phone}
                                         onChange={(e) => setObj({
                                             ...obj,
                                             phone: e.target.value
                                         })}
                            />
                        </FormGroup>
                        <FormGroup className="my-2">
                            <label htmlFor="violationCounterCourierInput" className="mb-1">Число нарушений</label>
                            <FormControl type="number" id="violationCounterCourierInput"
                                         placeholder="Введите количество нарушений"
                                         value={obj.violation_counter}
                                         onChange={(e) => setObj({
                                             ...obj,
                                             violation_counter: e.target.value
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