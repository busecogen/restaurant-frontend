import React, {ReactNode} from "react";

interface MatryoshkaProps {
    children: ReactNode;
}

const Matryoshka: React.FC<MatryoshkaProps> & {
    Item: React.FC<MatryoshkaItemProps>;
    Endpoint: React.FC<MatryoshkaEndpointProps>;
} = ({children}) => {
    return (
        <div className="matryoshka w-100">
            {children}
        </div>
    );
};

interface MatryoshkaItemProps {
    initialExpand: boolean;
    label: string;
    id:string;
    children: ReactNode;
}

const MatryoshkaItem: React.FC<MatryoshkaItemProps> = ({initialExpand, label,id, children}) => {

    const handleClick = () => {
        let expandable = document.getElementById(id);
        if (expandable !== null) {
            expandable.classList.toggle('expanded');
        }
    }

    return (
        <div className={`contentBx ${initialExpand ? 'expanded' : ''} ms-3`} id={id}>
            <div className={`label`} onClick={handleClick} id={"matryoshka-label-"+ id}>{label}</div>
            <div className={`content`}>{children}</div>
        </div>
    );
};

interface MatryoshkaEndpointProps {
    clickEvent?: () => void;
    id:string
    label: string;
}

const MatryoshkaEndpoint: React.FC<MatryoshkaEndpointProps> = ({label,clickEvent,id}) => {
    return <div className="contentBx ms-3" onClick={clickEvent} >
        <div className="endpoint" id={"matryoshka-label-"+ id}>{label}</div>
    </div>
};


Matryoshka.Item = MatryoshkaItem;
Matryoshka.Endpoint = MatryoshkaEndpoint;

export default Matryoshka;

