import React from "react";
import {useApi} from "@technarts/react-use-api";
import {useNavigate} from "react-router-dom";
import {RangerContext} from "../../App";

type ApiProp = {
    refresh: string
}

export default function Logout() {
    const apiPoster = useApi<ApiProp>({url: "http://localhost:8000/", method: "POST"});
    const navigate = useNavigate();
    const {setAuthUser, setCurrentCase} = React.useContext(RangerContext);


    React.useEffect(() => {
        try {
            apiPoster.call({
                url: 'http://localhost:8000/logout/',
                headers: {"Content-Type": 'application/json'},
                payload: {refresh: localStorage.getItem('refresh')}
            })
            localStorage.clear();
            setAuthUser('');
            setCurrentCase('');
            navigate("/login");
        } catch (e) {
            console.log('logout not working', e)
        }
    }, []);
    return (
        <div></div>
    )
}