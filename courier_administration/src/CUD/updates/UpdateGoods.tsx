import {useEquipmentsSelect} from "../../hooks/EquipmentsSelectHook";
import Modal from "react-bootstrap/Modal";
import {FormControl, FormGroup, FormSelect} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import React from "react";
import {useGoodsSelect} from "../../hooks/GoodsSelectHook";

interface modalProps {
    show: boolean
    handleClose: () => void
    updateHandler: (obj: object) => void
    setObj: (obj: any) => void
    obj: any
}

export function UpdateGoods({show, handleClose, updateHandler, obj, setObj}: modalProps) {
    let {goodTypes} = useGoodsSelect();

    return (
        <div
            className="modal show"
            style={{display: 'block', position: 'initial'}}
        >
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton className="standard">
                    <Modal.Title>Обновить данные о товаре</Modal.Title>
                </Modal.Header>

                <Modal.Body className="standard">
                    <form className="border-0">
                        <FormGroup className="mb-2">
                            <label htmlFor="goodType" className="col-form-label">Тип
                                товара</label>
                            <div>
                                <FormSelect id="goodType"
                                            value={obj.good_type_id}
                                            onChange={(e) => {
                                                e.preventDefault()
                                                setObj({
                                                    ...obj,
                                                    good_type_id: e.target.value
                                                })
                                            }}>
                                    {goodTypes.map((value) => {
                                        return (
                                            <option key={value.good_type_id}
                                                    value={value.good_type_id}>{value.description}</option>
                                        )
                                    })}
                                </FormSelect>
                            </div>
                        </FormGroup>
                        <FormGroup className="mb-2">
                            <label htmlFor="goodsDescription" className="mb-1">Описание товара:</label>
                            <FormControl type="text" id="goodsDescription"
                                         placeholder="Введите описание товара"
                                         value={obj.goods_description}
                                         onChange={(e) => setObj({
                                             ...obj,
                                             goods_description: e.target.value
                                         })}
                            />
                        </FormGroup>
                        <FormGroup className="mb-2">
                            <label htmlFor="goodsCount" className="mb-1">Количество товара:</label>
                            <FormControl type="number" id="goodsCount"
                                         placeholder="Введите количество товара"
                                         value={obj.count}
                                         onChange={(e) => setObj({
                                             ...obj,
                                             count: e.target.value
                                         })}
                            />
                        </FormGroup>
                        <button type="submit" className="btn btn-primary my-2" onClick={(e) => {
                            e.preventDefault();
                            updateHandler(obj);
                            handleClose();
                        }
                        }>Обновить
                        </button>
                    </form>
                </Modal.Body>

                <Modal.Footer className="standard">
                    <Button variant="primary" onClick={handleClose}>Закрыть</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}