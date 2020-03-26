import { ListElementData } from './list-element.data'

export default class ListUtils {
    static removeItemFromList(list: ListElementData[], id: string) { //should work for both lists
        let updatedList = list.filter(function (item) {
            return item.id != id;
        });
        return updatedList;
    }
}