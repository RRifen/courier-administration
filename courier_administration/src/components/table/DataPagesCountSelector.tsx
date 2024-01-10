import {FormGroup, FormSelect} from "react-bootstrap";
import React from "react";
import "../../css/CustomStyles.css"

interface DataPagesCountSelectorProps {
    page: number
    setPage: any
    setPerPage: any
}

export function DataPagesCountSelector({page, setPage, setPerPage}: DataPagesCountSelectorProps) {


    return (
            <FormGroup>
                <FormSelect className="form-control bg-dark text-light standard" name="state" id="maxRows" onChange={(e) => {
                    e.preventDefault();
                    const value = e.currentTarget.value;
                    if (parseInt(value) !== page) {
                        setPage(1);
                        setPerPage(value);
                    }
                }}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                </FormSelect>
            </FormGroup>
    );
}