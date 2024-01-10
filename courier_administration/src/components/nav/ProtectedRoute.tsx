import React from "react";
import {Navigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";

type ProtectedRouteProps = {
    role: string
    children: JSX.Element,
}

interface JwtBody {
    roles: Array<string>
}

function getRole() {
    if (!localStorage.getItem('token')) {
        return "";
    }
    {/*
    // @ts-ignore */}
    let decodedToken = jwtDecode<JwtBody>(localStorage.getItem('token'));
    return decodedToken.roles[0];
}

export const ProtectedRoute = ({ role, children }: ProtectedRouteProps) => {

    const roleFromJwt = getRole();

    if (roleFromJwt !== role) {
        return <Navigate to="/" replace />;
    }
    return children;
};