import {useProviders} from "../hooks/ProvidersHook";
import {Navigation} from "../components/nav/Navigation";
import {ModalWindow} from "../components/modal/ModalWindow";
import {UpdateProviders} from "../CUD/updates/UpdateProviders";
import {Col, Container, Row} from "react-bootstrap";
import {SearchProviders} from "../CUD/search/SearchProviders";
import {InsertProviders} from "../CUD/insert/InsertProviders";
import {DataTable} from "../components/table/DataTable";
import {DataPagesCountSelector} from "../components/table/DataPagesCountSelector";
import {PaginationUnderTable} from "../components/table/PaginationUnderTable";
import React from "react";
import {useReports} from "../hooks/ReportsHook";
import {InsertReports} from "../CUD/insert/InsertReports";
import {SearchReports} from "../CUD/search/SearchReports";
import {UpdateReports} from "../CUD/updates/UpdateReports";

export function ReportsPage() {
    const {generatePropsForDBAccess} = useReports();

    let props = generatePropsForDBAccess();
    return (
        <div style={{minHeight: "100vh", backgroundColor: "#393646"}} className="pb-3">
            <Navigation/>
            <ModalWindow handleClose={props.handleCloseErrorDelete} show={props.showErrorDelete}
                         modalBody={"Данную запись не получится удалить"} modalTitle={"Error"}/>
            <UpdateReports obj={props.updateObj} setObj={props.setUpdateObj} updateHandler={props.updateHandler}
                             show={props.showUpdateModal}
                             handleClose={props.handleCloseUpdateModal}/>
            <Container className="standard mt-3 rounded">
                <Row className="pt-3">
                    <div>
                        <h2 style={{textAlign: "center"}}>Отчеты</h2>
                    </div>
                </Row>
                <Row>
                    <Col className="col-6">
                        <Container className="pt-3">
                            <Row>
                                <Col>
                                    <SearchReports searchHandler={props.searchHandler}
                                                     setPage={props.setPage}/>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                    <Col className="col-6">
                        <Container className="pt-3">
                            <Row>
                                <InsertReports insertHandler={props.insertHandler}/>
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