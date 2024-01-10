import React from 'react';
import {Button} from "react-bootstrap";

interface DataObjectProps {
    obj: object
    deleteHandler: (obj: object) => void
    updateHandler: (obj: object) => void
}
export function DataObject({ obj, deleteHandler, updateHandler} : DataObjectProps) {
    return (
        <>
            {Object.entries(obj).map(([key, value], index) =>
                <td key={index}>{value}</td>
            )}
            <td className="text-center">
                <Button className="btn-danger float-start" onClick={() => {
                    deleteHandler(obj);
                }}>X</Button>
            </td>
            <td className="text-center">
                <Button className="btn-info float-start" onClick={() => {
                    updateHandler(obj);
                }}>Обновить</Button>
            </td>
        </>
    );
}