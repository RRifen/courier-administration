import {Navigation} from "../components/nav/Navigation";
import {ModalWindow} from "../components/modal/ModalWindow";
import {UpdateOrder} from "../CUD/updates/UpdateOrders";
import {Col, Container, Row} from "react-bootstrap";
import {SearchOrders} from "../CUD/search/SearchOrders";
import {DataTable} from "../components/table/DataTable";
import {DataPagesCountSelector} from "../components/table/DataPagesCountSelector";
import {PaginationUnderTable} from "../components/table/PaginationUnderTable";
import React from "react";
import {useProviders} from "../hooks/ProvidersHook";
import {SearchProviders} from "../CUD/search/SearchProviders";
import {UpdateIssuePoint} from "../CUD/updates/UpdateIssuePoint";
import {SearchIssuePoints} from "../CUD/search/SearchIssuePoints";
import {InsertIssuePoints} from "../CUD/insert/InsertIssuePoints";
import {InsertProviders} from "../CUD/insert/InsertProviders";
import {UpdateProviders} from "../CUD/updates/UpdateProviders";

export function ProvidersPage() {
    const {generatePropsForDBAccess} = useProviders();

    let props = generatePropsForDBAccess();
    return (
        <div style={{minHeight: "100vh", backgroundColor: "#393646"}} className="pb-3">
            <Navigation/>
            <ModalWindow handleClose={props.handleCloseErrorDelete} show={props.showErrorDelete}
                         modalBody={"Данную запись не получится удалить"} modalTitle={"Error"}/>
            <UpdateProviders obj={props.updateObj} setObj={props.setUpdateObj} updateHandler={props.updateHandler}
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
                                    <SearchProviders searchHandler={props.searchHandler}
                                                       setPage={props.setPage}/>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                    <Col className="col-6">
                        <Container className="pt-3">
                            <Row>
                                <InsertProviders insertHandler={props.insertHandler}/>
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