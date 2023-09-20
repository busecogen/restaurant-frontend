import React, {useContext, useEffect} from "react";
import Monitor from "./Monitor";
import {UrlContext} from "../RangerApp";
import {MenuItemProps} from "../../../utils/MenuUtils";
import {useApi} from "@technarts/react-use-api";
import Slider from "./Slider";
import MenuTree from "./MenuTree";
import {guard} from "../../../utils/AuthUtils";
import Notes from "./Notes";

export type GetterProp = {
    food_name: string;
    explanation: string;
};

export const Ranger: React.FC<{ menuItems: MenuItemProps[], parentChildMap: {} }> = ({menuItems, parentChildMap}) => {
    const apiGetter = useApi<GetterProp>({url: `http://127.0.0.1:8000/`, method: 'GET', responseGuard: guard});

    const [view, setView] = React.useState<GetterProp | null>(null)
    const [currentIndex, setCurrentIndex] = React.useState<number>(-1)
    const urls = useContext(UrlContext);

    const setContent = (index: number) => {
        setCurrentIndex(index);
        let url = urls[index];
        apiGetter.call(
            {
                url: `http://127.0.0.1:8000/${url}`,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('access')}`
                }
            });
        expandParents(index, parentChildMap);
    };

    function expandParents(currentIndex: number, parentChildMap: Record<number, number | null>) {
        let parentIndex: number | null = parentChildMap[currentIndex];
        while (parentIndex !== null) {
            let parent = document.getElementById("" + parentIndex);
            if (parent !== null) {
                if (!parent.classList.contains('expanded')) {
                    parent.classList.toggle('expanded');
                }
            }
            parentIndex = parentChildMap[parentIndex];
        }
    }


    const previousView = () => setContent(currentIndex - 1);
    const nextView = () => setContent(currentIndex + 1);

    const navigate = (direction: string) => {
        if (direction === 'left' && currentIndex > 0) previousView()
        else if (direction === 'right' && currentIndex < urls.length - 1) nextView()
    }

    useEffect(() => {
        if (apiGetter.RESP) {
            setView(apiGetter.RESP);
        }
    }, [apiGetter.RESP]);
    return (
        <div className="vh-100 w-100">
            <div className="d-flex flex-row mt-3 ">
                <div id="menuTree" >
                    <MenuTree menuItems={menuItems} onItemClick={setContent} currentIndex={currentIndex}
                              parentChildMap={parentChildMap}/>
                </div>
                <div className="d-flex flex-column w-75 me-5 position-relative" id="monitor">
                    <div className="d-flex">
                       <Notes/>
                    </div>
                    <div>{view && <Monitor view={view}/>}</div>
                    <div className="position-absolute" style={{bottom: "10px", right: "50%"}}>
                        <Slider giveDirection={navigate}/>
                    </div>
                </div>

            </div>
        </div>
    );
};




