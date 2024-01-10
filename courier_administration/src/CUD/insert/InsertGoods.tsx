import React, {useState} from "react";
import {useGoodsSelect} from "../../hooks/GoodsSelectHook";
import {Button, FormGroup, FormSelect} from "react-bootstrap";

interface InsertAdminsProps {
    insertHandler: (obj: any) => void
}

export function InsertGoods({insertHandler}: InsertAdminsProps) {
    let [newGood, setNewGood] = useState({good_id: "", provider_id: "", good_type_id: "", goods_description: "", count: ""})
    let {goodTypes, setGoodTypes} = useGoodsSelect();

    return (
        <form className="standard p-3 rounded">
            <FormGroup className="row mt-2">
                <label htmlFor="goodTypeIdI" className="col-3 col-form-label text-end">Тип товара:</label>
                <div className="col-sm-9">
                    <FormSelect id="goodTypeIdI"
                                value={newGood.good_type_id}
                                onChange={(e) => {
                                    e.preventDefault()
                                    setNewGood({
                                        ...newGood,
                                        good_type_id: e.target.value
                                    })
                                }}>
                        <option value="">Выберите тип товара</option>
                        {goodTypes.map((value) => {
                            return (
                                <option key={value.good_type_id}
                                        value={value.good_type_id}>{value.description}</option>
                            )
                        })}
                    </FormSelect>
                </div>
            </FormGroup>
            <FormGroup className="row mt-2">
                <label htmlFor="goodIdI" className="col-3 col-form-label text-end">ID товара:</label>
                <div className="col-sm-9 align-self-center">
                    <input value={newGood.good_id} type="number" className="form-control" id="goodIdI"
                           placeholder="ID товара"
                           onChange={(e) => setNewGood({...newGood, good_id: e.target.value})}
                    />
                </div>
            </FormGroup>
            <FormGroup className="row mt-2">
                <label htmlFor="providerIdI" className="col-3 col-form-label text-end">ID поставщика:</label>
                <div className="col-sm-9 align-self-center">
                    <input value={newGood.provider_id} type="number" className="form-control" id="providerIdI"
                           placeholder="ID товара"
                           onChange={(e) => setNewGood({...newGood, provider_id: e.target.value})}
                    />
                </div>
            </FormGroup>
            <FormGroup className="row mt-2">
                <label htmlFor="goodsDescriptionI" className="col-3 col-form-label text-end">Описание товара:</label>
                <div className="col-sm-9">
                    <input value={newGood.goods_description} type="text" className="form-control" id="goodsDescriptionI"
                           placeholder="Описание"
                           onChange={(e) => setNewGood({...newGood, goods_description: e.target.value})}
                    />
                </div>
            </FormGroup>
            <FormGroup className="row mt-2">
                <label htmlFor="goodCountI" className="col-3 col-form-label text-end">Количество товара:</label>
                <div className="col-sm-9 align-self-center">
                    <input value={newGood.count} type="number" className="form-control" id="goodCountI"
                           placeholder="Количество"
                           onChange={(e) => setNewGood({...newGood, count: e.target.value})}
                    />
                </div>
            </FormGroup>
            <FormGroup className="row mt-2 me-1">
                <Button id="button-addon2" className="offset-10 offset-sm-9 col-2 col-sm-3"
                        onClick={(e) => {
                            e.preventDefault();
                            insertHandler(newGood);
                        }}>Добавить</Button>
            </FormGroup>
        </form>
    )
}