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

export function UpdateReportType({show, handleClose, updateHandler, obj, setObj}: modalProps) {

    return (
        <div
            className="modal show"
            style={{display: 'block', position: 'initial'}}
        >
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton className="standard">
                    <Modal.Title>Обновить данные о типе отчета</Modal.Title>
                </Modal.Header>

                <Modal.Body className="standard">
                    <form className="border-0">
                        <FormGroup className="mb-2">
                            <label htmlFor="descriptionReportTypeU" className="mb-1">Описание отчета</label>
                            <FormControl type="text" id="descriptionReportTypeU"
                                         placeholder="Введите описание"
                                         value={obj.description}
                                         onChange={(e) => setObj({
                                             ...obj,
                                             description: e.target.value
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