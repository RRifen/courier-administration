import {Button} from "react-bootstrap";
import React from "react";

interface DataObjectProps {
    obj: object
    updateHandler: (obj: object) => void
    addViolationHandler: (obj: object) => void
}
export function DataObjectCouriersU({ obj, updateHandler, addViolationHandler} : DataObjectProps) {
    return (
        <>
            {Object.entries(obj).map(([key, value], index) =>
                <td key={index}>{value}</td>
            )}
            <td className="text-center">
                <Button className="btn-info float-start" onClick={() => {
                    updateHandler(obj);
                }}>Обновить</Button>
            </td>
            <td className="text-center">
                <Button className="btn-warning float-start" onClick={() => {
                    addViolationHandler(obj);
                }}>+1 нарушение</Button>
            </td>
        </>
    );
}