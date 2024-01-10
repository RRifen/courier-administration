import React, {useState} from "react";
import {Button, FormGroup} from "react-bootstrap";

interface SearchGroupProps {
    setPage: (page: number) => void
    searchHandler: (obj: any) => void
}

export function SearchGoodTypes({searchHandler}: SearchGroupProps) {

    let [goodType, setGoodType] = useState({good_type_id: "", description: ""})

    return (
        <form className="standard p-3 rounded">
            <FormGroup className="row">
                <label htmlFor="goodTypeIdS" className="col-3 col-form-label text-end">ID типа отчета:</label>
                <div className="col-sm-9 align-self-center">
                    <input value={goodType.good_type_id} type="number" className="form-control" id="goodTypeIdS" placeholder="ID"
                           onChange={(e) => setGoodType({...goodType, good_type_id: e.target.value})}
                    />
                </div>
            </FormGroup>
            <FormGroup className="row mt-2">
                <label htmlFor="GoodTypeDescriptionS" className="col-3 col-form-label text-end">Описание:</label>
                <div className="col-sm-9 align-self-center">
                    <input value={goodType.description} type="text" className="form-control" id="GoodTypeDescriptionS" placeholder="Описание"
                           onChange={(e) => setGoodType({...goodType, description: e.target.value})}
                    />
                </div>
            </FormGroup>
            <FormGroup className="row mt-2 me-1">
                <Button id="button-addon2" className="offset-10 offset-sm-9 col-2 col-sm-3" onClick={() => searchHandler(goodType)}>Искать</Button>
            </FormGroup>
        </form>
    )
}