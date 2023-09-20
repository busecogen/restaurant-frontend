import React from "react";
import backward from '../../../img/backward.svg'
import forward from '../../../img/forward.svg'

type NavigatorProps = {
    giveDirection: (direction : string) => void
}
const Slider: React.FC<NavigatorProps> = ({giveDirection}) => {
    const navigateView = (direction: string) => {
        giveDirection(direction);
    }
    return (
        <div className="d-flex flex-row position-relative start-50">
            <button type="button" className="button me-4" onClick={() => navigateView("left")} id="backward">
                <img width="40px" height="40px" alt="prev" src={backward}/>
            </button>
            <button type="button" className="button" onClick={() => navigateView("right")}>
                <img width="40px" height="40px" alt="next" src={forward}/>
            </button>
        </div>
    )
}

export default Slider;