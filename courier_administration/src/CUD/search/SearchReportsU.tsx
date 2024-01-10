import React, {useState} from "react";
import {useReportsSelect} from "../../hooks/ReportsSelectHook";
import {Button, FormGroup, FormSelect} from "react-bootstrap";

interface SearchGroupProps {
    setPage: (page: number) => void
    searchHandler: (obj: any) => void
}

export function SearchReportsU({searchHandler}: SearchGroupProps) {

    let [report, setReport] = useState({report_id: "", admin_id: "", report_type_id: "", report_text: ""})
    let {reportTypes} = useReportsSelect();

    return (
        <form className="standard p-3 rounded">
            <FormGroup className="row mt-2">
                <label htmlFor="reportTypeIdS" className="col-3 col-form-label text-end">Тип отчета:</label>
                <div className="col-sm-9">
                    <FormSelect id="reportTypeIdS"
                                value={report.report_type_id}
                                onChange={(e) => {
                                    e.preventDefault()
                                    setReport({
                                        ...report,
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
                <label htmlFor="reportIdS" className="col-3 col-form-label text-end">ID отчета:</label>
                <div className="col-sm-9 align-self-center">
                    <input value={report.report_id} type="number" className="form-control" id="reportIdS" placeholder="ID отчета"
                           onChange={(e) => setReport({...report, report_id: e.target.value})}
                    />
                </div>
            </FormGroup>
            <FormGroup className="row mt-2">
                <label htmlFor="reportTextS" className="col-3 col-form-label text-end">Текст отчета:</label>
                <div className="col-sm-9 align-self-center">
                    <input value={report.report_text} type="text" className="form-control" id="reportTextS" placeholder="Текст отчета"
                           onChange={(e) => setReport({...report, report_text: e.target.value})}
                    />
                </div>
            </FormGroup>
            <FormGroup className="row mt-2 me-1">
                <Button id="button-addon2" className="offset-10 offset-sm-9 col-2 col-sm-3" onClick={() => searchHandler(report)}>Искать</Button>
            </FormGroup>
        </form>
    )
}