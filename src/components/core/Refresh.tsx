import {useApi} from "@technarts/react-use-api";
import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {refreshGuard} from "../../utils/AuthUtils";


type AuthRefreshProp = {
    refresh: string,
    access: string,
}
export default function Refresh() {
    const navigate = useNavigate();
    const apiPoster = useApi<AuthRefreshProp>({
        url: "http://localhost:8000",
        method: "POST",
        responseGuard: refreshGuard
    });


    React.useEffect(() => {
        apiPoster.call({
            url: "http://localhost:8000/token/refresh/",
            headers: {"Content-Type": "application/json"},
            payload: {refresh: localStorage.getItem("refresh")},
        })
    }, []);


    useEffect(() => {
        if (apiPoster.RESP) {
                localStorage.setItem("access", apiPoster.RESP.access);
                localStorage.setItem("refresh", apiPoster.RESP.refresh);
                navigate("/");
        }
    }, [apiPoster.RESP]);
    return (
        <>
            <p>redirecting</p>
        </>
    )
}