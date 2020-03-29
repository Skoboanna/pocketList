import { ListElementData } from './list-element.data'
import ListUtils from './list-utils';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class StoredListService {
    public listItems: ListElementData[] = [];

    constructor(public listName: string) { }

    public getListItems(): any {
        this.listItems = ListUtils.getListFromLocalStorage(this.listName);
        return this.listItems ? this.listItems : [];
    }

    public addListItemByTitle(title: string) {
        if (this.listItems === null) {
            this.listItems = [];
        }
        this.listItems.push(new ListElementData(title));
        ListUtils.saveListInLocalStorage(this.listName, this.listItems);
    }

    public addListItem(item: ListElementData[]) {
        if (this.listItems === null) {
            this.listItems = [];
        }
        this.listItems = this.listItems.concat(item);
    }

    public removeItemFromList(id: string) {
        this.listItems = ListUtils.removeItemFromList(this.listItems, this.listName, id);
    }
}