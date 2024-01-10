import {Nav, Navbar, NavbarBrand, NavbarCollapse, NavbarToggle, NavDropdown, NavLink} from "react-bootstrap";
import logo from '../../images/logo-delivery.png'
import React from "react";
import Button from "react-bootstrap/Button";

export function Navigation() {
    return (
        <Navbar className="navbar-expand-lg navbar-dark bg-dark ps-3">
            <NavbarBrand>
                <img src={logo} width="30" height="30" alt="logo"/>
            </NavbarBrand>
            <NavbarToggle type="button" data-toggle="collapse" data-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </NavbarToggle>
            <NavbarCollapse id="navbarNav">
                <Nav className="navbar-nav">
                    <NavLink className="nav-item" href="/admins">
                        Админы
                    </NavLink>
                    <NavLink className="nav-item" href="/couriers">
                        Курьеры
                    </NavLink>
                    <NavLink className="nav-item" href="/equipments">
                        Оборудование
                    </NavLink>
                    <NavLink className="nav-item" href="/goods">
                        Товары
                    </NavLink>
                    <NavLink className="nav-item" href="/issue-points">
                        Точки выдачи
                    </NavLink>
                    <NavLink className="nav-item" href="/orders">
                        Заказы
                    </NavLink>
                    <NavLink className="nav-item" href="/providers">
                        Поставщики
                    </NavLink>
                    <NavLink className="nav-item" href="/reports">
                        Отчеты
                    </NavLink>
                    <NavDropdown title="Типы" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/good-types">Типы товаров</NavDropdown.Item>
                        <NavDropdown.Item href="/report-types">Типы отчетов</NavDropdown.Item>
                        <NavDropdown.Item href="/equipment-types">Типы оборудования</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </NavbarCollapse>
            <Button className="btn-danger me-3" onClick={(e) => {
                e.preventDefault();
                localStorage.setItem('token', '');
                window.location.href = "/";
            }
            }>Выйти из аккаунта</Button>
        </Navbar>
    )
}