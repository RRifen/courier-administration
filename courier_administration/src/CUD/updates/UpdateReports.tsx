import Modal from "react-bootstrap/Modal";
import {FormControl, FormGroup, FormSelect} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import React from "react";
import {useReportsSelect} from "../../hooks/ReportsSelectHook";

interface modalProps {
    show: boolean
    handleClose: () => void
    updateHandler: (obj: object) => void
    setObj: (obj: any) => void
    obj: any
}

export function UpdateReports({show, handleClose, updateHandler, obj, setObj}: modalProps) {
    let {reportTypes} = useReportsSelect();
    obj.report_date = obj.report_date.toString().substring(0, 16);

    return (
        <div
            className="modal show"
            style={{display: 'block', position: 'initial'}}
        >
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton className="standard">
                    <Modal.Title>Обновить отчет</Modal.Title>
                </Modal.Header>

                <Modal.Body className="standard">
                    <form className="border-0">
                        <FormGroup className="mb-2">
                            <label htmlFor="reportType" className="col-form-label">Тип
                                отчета</label>
                            <div>
                                <FormSelect id="reportType"
                                            value={obj.report_type_id}
                                            onChange={(e) => {
                                                e.preventDefault()
                                                setObj({
                                                    ...obj,
                                                    report_type_id: e.target.value
                                                })
                                            }}>
                                    {reportTypes.map((value) => {
                                        return (
                                            <option key={value.report_type_id}
                                                    value={value.report_type_id}>{value.description}</option>
                                        )
                                    })}
                                </FormSelect>
                            </div>
                        </FormGroup>
                        <FormGroup className="mb-2">
                            <label htmlFor="adminsIdS" className="mb-1">Id админа:</label>
                            <FormControl type="number" id="adminsIdS"
                                         placeholder="Id админа"
                                         value={obj.admin_id}
                                         onChange={(e) => setObj({
                                             ...obj,
                                             admin_id: e.target.value
                                         })}
                            />
                        </FormGroup>
                        <FormGroup className="mb-2">
                            <label htmlFor="reportDateU" className="mb-1">Дата отчета:</label>
                            <FormControl type="datetime-local" id="reportDateU"
                                         placeholder="Дата отчета"
                                         value={obj.report_date}
                                         onChange={(e) => {
                                             setObj({
                                                     ...obj,
                                                     report_date: e.target.value
                                                 }
                                             )
                                         }}
                            />
                        </FormGroup>
                        <FormGroup className="mb-2">
                            <label htmlFor="reportTextU" className="mb-1">Текст отчета:</label>
                            <FormControl type="text" id="reportTextU"
                                         placeholder="Текст отчета"
                                         value={obj.report_text}
                                         onChange={(e) => setObj({
                                             ...obj,
                                             report_text: e.target.value
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