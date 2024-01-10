import React, {useState} from "react";
import {Button, FormGroup} from "react-bootstrap";

interface SearchGroupProps {
    setPage: (page: number) => void
    searchHandler: (obj: any) => void
}

export function SearchIssuePoints({searchHandler}: SearchGroupProps) {

    let [issuePoint, setIssuePoint] = useState({issue_point_id: "", address: "", admin_id: ""})

    return (
        <form className="standard p-3 rounded">
            <FormGroup className="row">
                <label htmlFor="courierId" className="col-3 col-form-label text-end">ID курьера:</label>
                <div className="col-sm-9 align-self-center">
                    <input value={issuePoint.issue_point_id} type="number" className="form-control" id="issuePointId" placeholder="ID"
                           onChange={(e) => setIssuePoint({...issuePoint, issue_point_id: e.target.value})}
                    />
                </div>
            </FormGroup>
            <FormGroup className="row mt-2">
                <label htmlFor="courierName" className="col-3 col-form-label text-end">Адрес:</label>
                <div className="col-sm-9 align-self-center">
                    <input value={issuePoint.address} type="text" className="form-control" id="courierName" placeholder="Имя"
                           onChange={(e) => setIssuePoint({...issuePoint, address: e.target.value})}
                    />
                </div>
            </FormGroup>
            <FormGroup className="row mt-2">
                <label htmlFor="adminId" className="col-3 col-form-label text-end">ID админа:</label>
                <div className="col-sm-9 align-self-center">
                    <input value={issuePoint.admin_id} type="number" className="form-control" id="adminId" placeholder="ID админа"
                           onChange={(e) => setIssuePoint({...issuePoint, admin_id: e.target.value})}
                    />
                </div>
            </FormGroup>
            <FormGroup className="row mt-2 me-1">
                <Button id="button-addon2" className="offset-10 offset-sm-9 col-2 col-sm-3" onClick={() => searchHandler(issuePoint)}>Искать</Button>
            </FormGroup>
        </form>
    )
}