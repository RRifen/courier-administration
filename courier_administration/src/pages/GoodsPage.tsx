import {useEquipments} from "../hooks/EquipmentsHook";
import {Navigation} from "../components/nav/Navigation";
import {ModalWindow} from "../components/modal/ModalWindow";
import {UpdateEquipment} from "../CUD/updates/UpdateEquipments";
import {Col, Container, Row} from "react-bootstrap";
import {SearchEquipments} from "../CUD/search/SearchEquipments";
import {InsertEquipments} from "../CUD/insert/InsertEquipments";
import {DataTable} from "../components/table/DataTable";
import {DataPagesCountSelector} from "../components/table/DataPagesCountSelector";
import {PaginationUnderTable} from "../components/table/PaginationUnderTable";
import React from "react";
import {useGoods} from "../hooks/GoodsHook";
import {SearchGoods} from "../CUD/search/SearchGoods";
import {InsertGoods} from "../CUD/insert/InsertGoods";
import {UpdateGoods} from "../CUD/updates/UpdateGoods";

export function GoodsPage() {
    const {generatePropsForDBAccess} = useGoods();

    let props = generatePropsForDBAccess();
    return (
        <div style={{minHeight: "100vh", backgroundColor: "#393646"}} className="pb-3">
            <Navigation/>
            <ModalWindow handleClose={props.handleCloseErrorDelete} show={props.showErrorDelete}
                         modalBody={"Данную запись не получится удалить"} modalTitle={"Error"}/>
            <UpdateGoods obj={props.updateObj} setObj={props.setUpdateObj} updateHandler={props.updateHandler}
                             show={props.showUpdateModal}
                             handleClose={props.handleCloseUpdateModal}/>
            <Container className="standard mt-3 rounded">
                <Row>
                    <div>
                        <h2 style={{textAlign: "center"}}>Some text</h2>
                        <p></p>
                    </div>
                </Row>
                <Row>
                    <Col className="col-6">
                        <Container className="pt-3">
                            <Row>
                                <Col>
                                    <SearchGoods searchHandler={props.searchHandler}
                                                      setPage={props.setPage}/>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                    <Col className="col-6">
                        <Container className="pt-3">
                            <Row>
                                <InsertGoods insertHandler={props.insertHandler}/>
                            </Row>
                        </Container>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <DataTable headers={props.headers}
                                   data={props.data}
                                   page={props.page}
                                   perPage={props.perPage}
                                   deleteHandler={props.deleteHandler}
                                   updateHandler={props.updateHandlerCallback}
                        />
                    </Col>
                </Row>
                <Row className="mt-2 row-cols-auto">
                    <Col>
                        <label htmlFor="maxRows">Кол-во записей: </label>
                    </Col>
                    <Col className="col-xl-2 col-lg-4 col-md-4 col-6">
                        <DataPagesCountSelector page={props.page} setPage={props.setPage}
                                                setPerPage={props.setPerPage}/>
                    </Col>
                </Row>
                <Row className="mt-2">
                    <Col>
                        <PaginationUnderTable count={props.data.length} perPage={props.perPage}
                                              page={props.page}
                                              setPage={props.setPage}/>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}