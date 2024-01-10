import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {FormControl, FormGroup} from "react-bootstrap";

interface modalProps {
    show: boolean
    handleClose: () => void
    updateHandler: (obj: object) => void
    setObj: (obj: any) => void
    obj: any
}

export function UpdateAdmin({show, handleClose, updateHandler, obj, setObj}: modalProps) {

    return (
        <div
            className="modal show"
            style={{display: 'block', position: 'initial'}}
        >
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton className="standard">
                    <Modal.Title>Обновить данные об админе</Modal.Title>
                </Modal.Header>

                <Modal.Body className="standard">
                    <form className="border-0">
                        <FormGroup className="mb-2">
                            <label htmlFor="loginAdminInput" className="mb-1">Логин</label>
                            <FormControl type="text" id="loginAdminInput"
                                         placeholder="Введите логин"
                                         value={obj.login}
                                         onChange={(e) => setObj({
                                             ...obj,
                                             login: e.target.value
                                         })}
                            />
                        </FormGroup>
                        <FormGroup className="my-2">
                            <label htmlFor="issuePointAdminInput" className="mb-1">ID пункта выдачи</label>
                            <FormControl type="number" id="issuePointAdminInput"
                                         placeholder="Введите ID пункта выдачи"
                                         value={obj.issue_point_id}
                                         onChange={(e) => setObj({
                                             ...obj,
                                             issue_point_id: e.target.value
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