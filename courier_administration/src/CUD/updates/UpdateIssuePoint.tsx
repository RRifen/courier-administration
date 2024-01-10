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

export function UpdateIssuePoint({show, handleClose, updateHandler, obj, setObj}: modalProps) {

    return (
        <div
            className="modal show"
            style={{display: 'block', position: 'initial'}}
        >
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton className="standard">
                    <Modal.Title>Обновить данные о пункте выдачи</Modal.Title>
                </Modal.Header>

                <Modal.Body className="standard">
                    <form className="border-0">
                        <FormGroup className="mb-2">
                            <label htmlFor="addressIssuePointInput" className="mb-1">Адрес</label>
                            <FormControl type="text" id="addressIssuePointInput"
                                         placeholder="Введите имя"
                                         value={obj.address}
                                         onChange={(e) => setObj({
                                             ...obj,
                                             address: e.target.value
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