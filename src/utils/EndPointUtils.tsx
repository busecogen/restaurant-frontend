import {useApi} from "@technarts/react-use-api";
import {guard} from "./AuthUtils";
import React from "react";

type EndPointProp = {
    id: number,
}


export function EndPointUtils() {
    const apiGetter = useApi<EndPointProp[]>({url: `http://127.0.0.1:8000/`, method: 'GET', responseGuard: guard});
    const [endpoints, setEndpoints] = React.useState<EndPointProp[]>([])

    React.useEffect(()=>{
        apiGetter.call(
            {
                url: `http://127.0.0.1:8000/deneme/`,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('access')}`
                }
            });

    })

    React.useEffect(()=>{
        if(apiGetter.RESP) setEndpoints(apiGetter.RESP)
    }, [apiGetter.RESP])

}