import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React from 'react';
import {RangerContext} from "../../App";


export const Navigation: React.FC = () => {
    const {authUser, currentCase} = React.useContext(RangerContext);

    return (
        <div>
            <Navbar id="navBar" variant="dark">
                <Navbar.Brand className="ms-3">
                    Ranger
                </Navbar.Brand>
                <Nav className="me-auto">
                    {authUser !== '' && currentCase !== '' ? <Nav.Link href="/case">{currentCase ? currentCase : ""}</Nav.Link> : null}
                </Nav>
                <Nav className="me-2 text-capitalize" style={{ color: "var(--bs-nav-link-color)" }}>
                    {authUser !== '' ? authUser : ''}
                </Nav>
                <Nav className="me-4">
                    {authUser !== '' ? <Nav.Link href="/logout">Logout</Nav.Link> :
                        <Nav.Link href="/login">Login</Nav.Link>}
                </Nav>
            </Navbar>
        </div>
    );
}