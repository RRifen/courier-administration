import React, {useState} from "react";
import {Button, ButtonToolbar, Col, Container, FormGroup, Row} from "react-bootstrap";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import {java_auth, java_registration} from "../data/API";

interface JwtBody {
    roles: Array<string>
}

export function AuthPage() {

    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");

    async function registration() {
        try {
            await axios.post(
                java_registration,
                {
                    username: username,
                    password: password
                },
                {
                    validateStatus: function (status) {
                        return status == 200;
                    }
                }
            ).catch((error) => {
                alert(error.response.data.message);
                throw new Error();
            });
            alert("Вы успешно зарегистрировались, можно произвести авторизацию");
            console.log("Вы успешно зарегистрировались");
        } catch (e) {
        }
    }

    async function authorization() {
        try {
            let response = await axios.post(
                java_auth,
                {
                    username: username,
                    password: password
                },
                {
                    validateStatus: function (status) {
                        return status == 200;
                    }
                }
            )
            .catch((error) => {
                alert(error.response.data.message);
                throw new Error();
            });
            localStorage.setItem('token', response.data.token);
            if (jwtDecode<JwtBody>(response.data.token).roles[0] === "ROLE_ADMIN") {
                window.location.href="/admins"
            }
            else {
                window.location.href="/couriers-u"
            }

        } catch (e) {
        }
    }

    return (
        <div style={{minHeight: "100vh", backgroundColor: "#393646"}} className="pb-3 pt-5">
            <Container className="standard mt-3 rounded" style={{width: "700px"}}>
                <Row className="mt-3">
                    <div>
                        <h2 style={{textAlign: "center"}}>Форма регистрации/авторизации</h2>
                        <p></p>
                    </div>
                </Row>
                <Row>
                    <Col>
                        <form className="p-3 mb-5" style={{border: "none"}}>
                            <FormGroup className="row">
                                <label htmlFor="adminLoginI" className="col-3 col-form-label text-end">Ваш логин</label>
                                <div className="col-sm-9">
                                    <input value={username} type="text" className="form-control" id="adminLoginI"
                                           placeholder="Логин"
                                           onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                            </FormGroup>
                            <FormGroup className="row mt-2">
                                <label htmlFor="adminPasswordI" className="col-3 col-form-label text-end">Ваш
                                    пароль</label>
                                <div className="col-sm-9">
                                    <input value={password} type="text" className="form-control" id="adminPasswordI"
                                           placeholder="Пароль"
                                           onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </FormGroup>
                            <ButtonToolbar className="mt-2 me-1 mb-2 justify-content-end">
                                <Button id="button-addon2" className=""
                                        onClick={(e) => {
                                            e.preventDefault();
                                            registration();
                                        }}>Зарегистрироваться</Button>
                                <Button id="button-addon2" className="mx-2"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            authorization();
                                        }}>Авторизоваться</Button>
                            </ButtonToolbar>
                        </form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}