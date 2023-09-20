import {useApi} from "@technarts/react-use-api";
import {MenuItemProps, processMenuItems} from "../../utils/MenuUtils";
import {guard} from "../../utils/AuthUtils";
import React, {createContext} from "react";
import {Ranger} from "./subcomponents/Ranger";
import {RangerContext} from "../../App";
import {useNavigate} from "react-router-dom";


export const UrlContext = createContext<string[]>([]);
export default function RangerApp() {
    const apiGetter = useApi<MenuItemProps[]>({url: 'http://127.0.0.1:8000/', method: 'POST', responseGuard: guard});
    const [menuItems, setMenuItems] = React.useState<MenuItemProps[]>([]);
    const urlList: string[] = [];
    const parentChildRelation = {}
    const navigate = useNavigate();
    const {currentCase} = React.useContext(RangerContext);


    if (currentCase === '') navigate("/case");

    React.useEffect(() => {
        if (currentCase !== '')
            apiGetter.call({
                url: 'http://127.0.0.1:8000/list/',
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('access')}`,
                    "Content-Type": "application/json",
                },
                payload: {case_name: currentCase}
            });
    }, []);

    React.useEffect(() => {
        setMenuItems(apiGetter.RESP || []);
    }, [apiGetter.RESP]);
    processMenuItems(menuItems, urlList, '', parentChildRelation, null);


    return (
        <UrlContext.Provider value={urlList}>
            <Ranger menuItems={menuItems} parentChildMap={parentChildRelation}/>
        </UrlContext.Provider>
    )
}