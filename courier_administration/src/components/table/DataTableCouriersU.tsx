import {Table} from "react-bootstrap";
import React from "react";
import {DataObjectCouriersU} from "./DataObjectCouriersU";

interface DataTableProps {
    headers: string[]
    data: object[]
    page: number
    perPage: number
    updateHandler: (obj: object) => void
    addViolationHandler: (obj: object) => void
}

export function DataTableCouriersU({headers, data, page, perPage, updateHandler, addViolationHandler}: DataTableProps) {

    let start: number = (page - 1) * perPage;
    let end: number = Number(start) + Number(perPage);

    return (
        <Table className="mt-4 table-hover table-dark table-responsive standard">
            <thead className="standard">
            <tr>
                {headers.map((header, index) =>
                    <th key={index}>{header}</th>
                )}
                <th>Изменить</th>
                <th>+1</th>
            </tr>
            </thead>
            <tbody className="standard">
            {data.slice(start, end).map((obj, index) =>
                <tr key={index}>
                    <DataObjectCouriersU updateHandler={updateHandler} addViolationHandler={addViolationHandler} obj={obj}/>
                </tr>
            )}
            </tbody>
        </Table>
    );
}