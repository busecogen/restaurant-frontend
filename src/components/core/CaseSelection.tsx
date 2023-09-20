import {useApi} from "@technarts/react-use-api";
import {guard} from "../../utils/AuthUtils";
import React, {ButtonHTMLAttributes, DetailedHTMLProps, MouseEventHandler} from "react";
import {RangerContext} from "../../App";
import {useNavigate} from "react-router-dom";


export function CaseSelection() {
    const apiGetter = useApi<string[]>({url: 'http://127.0.0.1:8000/', method: 'GET', responseGuard: guard});
    const [caseNames, setCaseNames] = React.useState<string[]>([]);
    const {setCurrentCase} = React.useContext(RangerContext);
    const navigate = useNavigate();


    React.useEffect(() => {
        apiGetter.call({
            url: 'http://127.0.0.1:8000/case/',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('access')}`,
            },
        });
    }, []);

    React.useEffect(() => {
        if (apiGetter.RESP) setCaseNames(apiGetter.RESP)
    }, [apiGetter.RESP]);

    const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>, caseName: string) => {
        setCurrentCase(caseName);
        navigate("/");
    };

    return (
        <div className="d-flex justify-content-center align-middle" id="case-container">
            <div className="card mt-4" id="case-content">
                <h5 className="card-header p-3 text-center fs-4">Please Select Case</h5>
                <div className="d-flex flex-column mx-5 mt-3">
                    {caseNames.map((item) => (
                        <button className="btn m-1 fs-5" id="classic-button" key={item} onClick={(event)=>handleOnClick(event,item)}>{item}</button>
                    ))}
                </div>
            </div>
        </div>
    )
}
