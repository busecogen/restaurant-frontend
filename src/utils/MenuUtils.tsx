export type MenuItemProps = {
    name: string;
    url: string;
    submenu: MenuItemProps[];
    index: number;
};

export function processMenuItems(menuItems: MenuItemProps[], urls: string[], prefix: string, parentChild: Record<number, number | null>, parentIndex: number | null = null): void {
    for (let i = 0; i < menuItems.length; i++) {
        const currentIndex = urls.push(prefix + menuItems[i].url) - 1;
        menuItems[i].index = currentIndex;
        parentChild[currentIndex] = parentIndex;


        if (menuItems[i].submenu.length > 0) {
            processMenuItems(menuItems[i].submenu, urls, prefix + menuItems[i].url, parentChild, currentIndex);
        }
    }
}