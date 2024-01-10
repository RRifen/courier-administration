import React, {useState} from "react";
import {useGoodsSelect} from "../../hooks/GoodsSelectHook";
import {Button, FormGroup, FormSelect} from "react-bootstrap";
import {useReportsSelect} from "../../hooks/ReportsSelectHook";

interface InsertAdminsProps {
    insertHandler: (obj: any) => void
}

export function InsertReports({insertHandler}: InsertAdminsProps) {
    let [newReport, setNewReport] = useState({admin_id: "", report_type_id: "", report_text: ""})
    let {reportTypes, setReportTypes} = useReportsSelect();

    return (
        <form className="standard p-3 rounded">
            <FormGroup className="row mt-2">
                <label htmlFor="reportTypeIdI" className="col-3 col-form-label text-end">Тип отчета:</label>
                <div className="col-sm-9">
                    <FormSelect id="reportTypeIdI"
                                value={newReport.report_type_id}
                                onChange={(e) => {
                                    e.preventDefault()
                                    setNewReport({
                                        ...newReport,
                                        report_type_id: e.target.value
                                    })
                                }}>
                        <option value="">Выберите тип отчета</option>
                        {reportTypes.map((value) => {
                            return (
                                <option key={value.report_type_id}
                                        value={value.report_type_id}>{value.description}</option>
                            )
                        })}
                    </FormSelect>
                </div>
            </FormGroup>
            <FormGroup className="row mt-2">
                <label htmlFor="adminIdI" className="col-3 col-form-label text-end">ID админа:</label>
                <div className="col-sm-9 align-self-center">
                    <input value={newReport.admin_id} type="number" className="form-control" id="adminIdI"
                           placeholder="ID админа"
                           onChange={(e) => setNewReport({...newReport, admin_id: e.target.value})}
                    />
                </div>
            </FormGroup>
            <FormGroup className="row mt-2">
                <label htmlFor="reportText" className="col-3 col-form-label text-end">Текст отчета:</label>
                <div className="col-sm-9">
                    <textarea value={newReport.report_text} className="form-control" id="reportText"
                           placeholder="Текст отчета"
                           onChange={(e) => setNewReport({...newReport, report_text: e.target.value})}
                    />
                </div>
            </FormGroup>
            <FormGroup className="row mt-2 me-1">
                <Button id="button-addon2" className="offset-10 offset-sm-9 col-2 col-sm-3"
                        onClick={(e) => {
                            e.preventDefault();
                            insertHandler(newReport);
                        }}>Добавить</Button>
            </FormGroup>
        </form>
    )
}