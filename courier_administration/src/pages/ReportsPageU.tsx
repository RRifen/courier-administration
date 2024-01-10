import {ModalWindow} from "../components/modal/ModalWindow";
import {Col, Container, Row} from "react-bootstrap";
import {DataTable} from "../components/table/DataTable";
import {DataPagesCountSelector} from "../components/table/DataPagesCountSelector";
import {PaginationUnderTable} from "../components/table/PaginationUnderTable";
import React from "react";
import {SearchReportsU} from "../CUD/search/SearchReportsU";
import {InsertReportsU} from "../CUD/insert/InsertReportsU";
import {UpdateReportsU} from "../CUD/updates/UpdateReportsU";
import {NavigationU} from "../components/nav/NavigationU";
import {useReportsU} from "../hooks/ReportsHookU";

export function ReportsPageU() {
    const {generatePropsForDBAccess} = useReportsU();

    let props = generatePropsForDBAccess();
    return (
        <div style={{minHeight: "100vh", backgroundColor: "#393646"}} className="pb-3">
            <NavigationU/>
            <ModalWindow handleClose={props.handleCloseErrorDelete} show={props.showErrorDelete}
                         modalBody={"Данную запись не получится удалить"} modalTitle={"Error"}/>
            <UpdateReportsU obj={props.updateObj} setObj={props.setUpdateObj} updateHandler={props.updateHandler}
                           show={props.showUpdateModal}
                           handleClose={props.handleCloseUpdateModal}/>
            <Container className="standard mt-3 rounded">
                <Row className="pt-3">
                    <div>
                        <h2 style={{textAlign: "center"}}>Ваши отчеты</h2>
                    </div>
                </Row>
                <Row>
                    <Col className="col-6">
                        <Container className="pt-3">
                            <Row>
                                <Col>
                                    <SearchReportsU searchHandler={props.searchHandler}
                                                   setPage={props.setPage}/>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                    <Col className="col-6">
                        <Container className="pt-3">
                            <Row>
                                <InsertReportsU insertHandler={props.insertHandler}/>
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