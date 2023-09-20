import Matryoshka from "../../matryoshka/Matryoshka";
import React from "react";
import {MenuItemProps} from "../../../utils/MenuUtils";

interface MenuTreeProps {
    menuItems: MenuItemProps[];
    onItemClick: (index: number) => void;
    currentIndex: number;
    parentChildMap: Record<number, number | null>;
}

const RenderMenuTree: React.FC<MenuTreeProps> = ({menuItems, onItemClick, currentIndex, parentChildMap}) => {

    React.useEffect(() => {
        let prevChosen = document.getElementsByClassName('chosenItemBackground');
        for (let i = 0; i < prevChosen.length; i++) prevChosen[i].classList.toggle('chosenItemBackground');
        let currentItem = document.getElementById("matryoshka-label-" + currentIndex);
        if (currentItem !== null) currentItem.classList.toggle('chosenItemBackground');
    }, [currentIndex])
    const handleMenuItemClick = (index: number) => {
        onItemClick(index);
    };

    return (
        <>
            {menuItems.map((menuItem) => (
                menuItem.submenu.length > 0 ? (
                    <Matryoshka.Item id={"" + menuItem.index} initialExpand={false} label={menuItem.name}
                                     key={menuItem.name + "-" + menuItem.index}>
                        <RenderMenuTree menuItems={menuItem.submenu} onItemClick={onItemClick}
                                        currentIndex={currentIndex} parentChildMap={parentChildMap}/>
                    </Matryoshka.Item>
                ) : (
                    <Matryoshka.Endpoint label={menuItem.name} key={menuItem.name + "-" + menuItem.index}
                                         id={"" + menuItem.index}
                                         clickEvent={() => handleMenuItemClick(menuItem.index)}/>
                )
            ))}
        </>
    )
}
const MenuTree: React.FC<MenuTreeProps> = ({menuItems, onItemClick, currentIndex, parentChildMap}) => {
    return (
        <>
            <Matryoshka>
                <RenderMenuTree menuItems={menuItems} onItemClick={onItemClick} currentIndex={currentIndex}
                                parentChildMap={parentChildMap}/>
            </Matryoshka>
        </>
    )
}
export default MenuTree;
