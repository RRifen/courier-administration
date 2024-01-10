import React, {useState} from "react";
import {Button, FormGroup} from "react-bootstrap";

interface SearchGroupProps {
    setPage: (page: number) => void
    searchHandler: (obj: any) => void
}

export function SearchReportTypes({searchHandler}: SearchGroupProps) {

    let [reportType, setReportType] = useState({report_type_id: "", description: ""})

    return (
        <form className="standard p-3 rounded">
            <FormGroup className="row">
                <label htmlFor="reportTypeIdS" className="col-3 col-form-label text-end">ID типа отчета:</label>
                <div className="col-sm-9 align-self-center">
                    <input value={reportType.report_type_id} type="number" className="form-control" id="reportTypeIdS" placeholder="ID"
                           onChange={(e) => setReportType({...reportType, report_type_id: e.target.value})}
                    />
                </div>
            </FormGroup>
            <FormGroup className="row mt-2">
                <label htmlFor="ReportTypeDescriptionS" className="col-3 col-form-label text-end">Описание:</label>
                <div className="col-sm-9 align-self-center">
                    <input value={reportType.description} type="text" className="form-control" id="ReportTypeDescriptionS" placeholder="Описание"
                           onChange={(e) => setReportType({...reportType, description: e.target.value})}
                    />
                </div>
            </FormGroup>
            <FormGroup className="row mt-2 me-1">
                <Button id="button-addon2" className="offset-10 offset-sm-9 col-2 col-sm-3" onClick={() => searchHandler(reportType)}>Искать</Button>
            </FormGroup>
        </form>
    )
}