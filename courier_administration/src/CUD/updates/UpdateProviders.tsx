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

export function UpdateProviders({show, handleClose, updateHandler, obj, setObj}: modalProps) {

    return (
        <div
            className="modal show"
            style={{display: 'block', position: 'initial'}}
        >
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton className="standard">
                    <Modal.Title>Обновить данные поставщика</Modal.Title>
                </Modal.Header>

                <Modal.Body className="standard">
                    <form className="border-0">
                        <FormGroup className="mb-2">
                            <label htmlFor="providerNameInput" className="mb-1">Название поставщика</label>
                            <FormControl type="text" id="providerNameInput"
                                         placeholder="Введите название поставщика"
                                         value={obj.provider_name}
                                         onChange={(e) => setObj({
                                             ...obj,
                                             provider_name: e.target.value
                                         })}
                            />
                        </FormGroup>
                        <FormGroup className="mb-2">
                            <label htmlFor="providerDescriptionInput" className="mb-1">Описание</label>
                            <FormControl type="text" id="providerDescriptionInput"
                                         placeholder="Введите описание поставщика"
                                         value={obj.description}
                                         onChange={(e) => setObj({
                                             ...obj,
                                             description: e.target.value
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