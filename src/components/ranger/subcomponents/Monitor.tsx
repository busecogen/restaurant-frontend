import React from "react";
import {GetterProp} from './Ranger'

interface MonitorProps {
    view: GetterProp,
}

const Monitor: React.FC<MonitorProps> = (Props) => {
    const image_name = Props.view.food_name.toLowerCase().replace(/\s/g, '') + ".jpeg"

    return (
        <div className="text-center d-flex flex-column p-2" >
                <h2 className="m-0 p-3"> {Props.view.food_name}</h2>
                <div className="p-1 " style={{height: "74vh"}}>
                    <p style={{fontSize:'23px'}} className="mt-4"> {Props.view.explanation}</p>
                    <div className="w-100" >
                        <img id="monitorImage"

                            alt="merhaba" src={process.env.PUBLIC_URL + '/images/' + image_name}/>
                    </div>
                </div>
        </div>
    );
};

export default Monitor;
