import { ListElementData } from './list-element.data'
import ListUtils from './list-utils';

export class StoredListService {
    private listItems: ListElementData[] = [];
    private listName: string;

    public getListItems(): any {
        this.listItems = ListUtils.getListFromLocalStorage(this.listName);
        return this.listItems;
    }

    public addListItem(title: string) {
        this.listItems.push(new ListElementData(title));
        ListUtils.saveListInLocalStorage(this.listName, this.listItems);
    }
}