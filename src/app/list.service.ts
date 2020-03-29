import { ListElementData } from './list-element.data'
import { StoredListService } from './storedList.service'
import { Injectable, EventEmitter } from '@angular/core';
import ListUtils from './list-utils';
import * as constants from './utilities/constants';

// @Injectable({
//     providedIn: 'root'
// })

export class ListService {
    public onChange = new EventEmitter();
    private toDoItems: ListElementData[] = [];
    private doneItems: ListElementData[] = [];

    public getListItems(): any { // delete all
        this.toDoItems = ListUtils.getListFromLocalStorage(constants.listItemsName);
        return this.toDoItems;
    }

    public getDoneItems(): ListElementData[] { // delete all
        this.doneItems = ListUtils.getListFromLocalStorage(constants.doneItemsName);
        return this.doneItems;
    }

    public addListItem(title: string) { // + onChange
        this.toDoItems.push(new ListElementData(title));
        ListUtils.saveListInLocalStorage(constants.listItemsName, this.toDoItems);
        this.onChange.emit();
    }

    public removeItemFromList(isDone: boolean, id: string) {
        if (isDone) {
            this.doneItems = ListUtils.removeItemFromList(this.doneItems, constants.doneItemsName, id);
        } else {
            this.toDoItems = ListUtils.removeItemFromList(this.toDoItems, constants.listItemsName, id);
        }
        this.onChange.emit();
    }

    public markListItemAsDone(id: string) { // refactor
        let doneItem = this.toDoItems.filter(item => item.id === id);
        this.toDoItems = ListUtils.removeItemFromList(this.toDoItems, constants.listItemsName, id);
        this.doneItems = this.doneItems.concat(doneItem);
        localStorage.setItem('doneItems', JSON.stringify(this.doneItems));
        this.onChange.emit();
    }

    public changeItemStatus(isDone: boolean, id: string) { //REFACTOR
        let item;

        if (isDone) {
            item = this.doneItems.filter(item => item.id === id);
            this.doneItems = ListUtils.removeItemFromList(this.doneItems, constants.doneItemsName, id);
            this.toDoItems = this.toDoItems.concat(item);
        } else {
            item = this.toDoItems.filter(item => item.id === id);
            this.toDoItems = ListUtils.removeItemFromList(this.toDoItems, constants.listItemsName, id);
            this.doneItems = this.doneItems.concat(item);
        }
        localStorage.setItem('listItems', JSON.stringify(this.toDoItems));
        localStorage.setItem('doneItems', JSON.stringify(this.doneItems));
        this.onChange.emit();
    }
}