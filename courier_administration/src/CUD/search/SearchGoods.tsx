import React, {useState} from "react";
import {useGoodsSelect} from "../../hooks/GoodsSelectHook";
import {Button, FormGroup, FormSelect} from "react-bootstrap";

interface SearchGroupProps {
    setPage: (page: number) => void
    searchHandler: (obj: any) => void
}

export function SearchGoods({searchHandler}: SearchGroupProps) {

    let [good, setGood] = useState({good_id: "", provider_id: "", good_type_id: "", goods_description: "", count: ""})
    let {goodTypes, setGoodTypes} = useGoodsSelect();

    return (
        <form className="standard p-3 rounded">
            <FormGroup className="row mt-2">
                <label htmlFor="goodTypeIdS" className="col-3 col-form-label text-end">Тип товара:</label>
                <div className="col-sm-9">
                    <FormSelect id="goodTypeIdS"
                                value={good.good_type_id}
                                onChange={(e) => {
                                    e.preventDefault()
                                    setGood({
                                        ...good,
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
                <label htmlFor="goodIdS" className="col-3 col-form-label text-end">ID товара:</label>
                <div className="col-sm-9 align-self-center">
                    <input value={good.good_id} type="number" className="form-control" id="goodIdS" placeholder="ID"
                           onChange={(e) => setGood({...good, good_id: e.target.value})}
                    />
                </div>
            </FormGroup>
            <FormGroup className="row mt-2">
                <label htmlFor="providerIdS" className="col-3 col-form-label text-end">ID поставщика:</label>
                <div className="col-sm-9 align-self-center">
                    <input value={good.provider_id} type="number" className="form-control" id="providerIdS" placeholder="ID"
                           onChange={(e) => setGood({...good, provider_id: e.target.value})}
                    />
                </div>
            </FormGroup>
            <FormGroup className="row mt-2">
                <label htmlFor="goodDescriptionS" className="col-3 col-form-label text-end">Описание товара:</label>
                <div className="col-sm-9 align-self-center">
                    <input value={good.goods_description} type="text" className="form-control" id="goodDescriptionS" placeholder="Описание товара"
                           onChange={(e) => setGood({...good, goods_description: e.target.value})}
                    />
                </div>
            </FormGroup>
            <FormGroup className="row mt-2">
                <label htmlFor="goodCountS" className="col-3 col-form-label text-end">Количество товара:</label>
                <div className="col-sm-9 align-self-center">
                    <input value={good.count} type="number" className="form-control" id="goodCountS" placeholder="Количество товара"
                           onChange={(e) => setGood({...good, count: e.target.value})}
                    />
                </div>
            </FormGroup>
            <FormGroup className="row mt-2 me-1">
                <Button id="button-addon2" className="offset-10 offset-sm-9 col-2 col-sm-3" onClick={() => searchHandler(good)}>Искать</Button>
            </FormGroup>
        </form>
    )
}