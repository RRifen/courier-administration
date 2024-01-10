import React from 'react';
import {DataObject} from "./DataObject";
import {Button, Table} from "react-bootstrap";
import "../../css/CustomStyles.css"

interface DataTableProps {
    headers: string[]
    data: object[]
    page: number
    perPage: number
    deleteHandler: (obj: object) => void
    updateHandler: (obj: object) => void
}

export function DataTable({headers, data, page, perPage, deleteHandler, updateHandler}: DataTableProps) {

    let start: number = (page - 1) * perPage;
    let end: number = Number(start) + Number(perPage);

    return (
        <Table className="mt-4 table-hover table-dark table-responsive standard">
            <thead className="standard">
            <tr>
                {headers.map((header, index) =>
                    <th key={index}>{header}</th>
                )}
                <th>Удалить</th>
                <th>Изменить</th>
            </tr>
            </thead>
            <tbody className="standard">
            {data.slice(start, end).map((obj, index) =>
                <tr key={index}>
                    <DataObject updateHandler={updateHandler} deleteHandler={deleteHandler} obj={obj}/>
                </tr>
            )}
            </tbody>
        </Table>
    );
}