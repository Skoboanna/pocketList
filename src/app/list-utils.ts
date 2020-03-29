import { ListElementData } from './list-element.data'

export default class ListUtils {
    static removeItemFromList(list: ListElementData[], listName: string, id: string) {
        let updatedList = list.filter(function (item) {
            return item.id != id;
        });
        this.saveListInLocalStorage(listName, updatedList);
        return updatedList;
    }

    static getListFromLocalStorage(listName: string) {
        return JSON.parse(localStorage.getItem(listName));
    }

    static saveListInLocalStorage(listName: string, list: ListElementData[]) {
        localStorage.setItem(listName, JSON.stringify(list));
    }

    static changeItemStatus(id: string, itemFrom: ListElementData[], itemTo: ListElementData[]) {

    }
}