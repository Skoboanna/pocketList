import { ListElementData } from './list-element.data'
import { StoredListService } from './storedList.service'
import { Injectable, EventEmitter } from '@angular/core';
import ListUtils from './list-utils';

@Injectable({
    providedIn: 'root'
})

export class ListService {
    public onChange = new EventEmitter();
    private toDoList: StoredListService;
    private doneList: StoredListService;

    constructor() {
        this.toDoList = new StoredListService('listItems');
        this.doneList = new StoredListService('doneItems');
        this.toDoList.listItems = [];
        this.doneList.listItems = [];
    }

    public getListItems(): ListElementData[] {
        return this.toDoList.getListItems();
    }

    public getDoneItems(): ListElementData[] {
        return this.doneList.getListItems();
    }

    public addListItem(title: string) {
        this.toDoList.addListItemByTitle(title);
        this.onChange.emit();
    }

    public removeItemFromList(isDone: boolean, id: string) {
        if (isDone) {
            this.doneList.removeItemFromList(id);
        } else {
            this.toDoList.removeItemFromList(id);
        }
        this.onChange.emit();
    }

    public markListItemAsDone(id: string) {
        let doneItem = ListUtils.getItemById(this.toDoList.listItems, id);
        this.toDoList.removeItemFromList(id);
        this.doneList.addListItem(doneItem);
        ListUtils.saveListInLocalStorage(this.doneList.listName, this.doneList.listItems);
        this.onChange.emit();
    }

    public changeItemStatus(isDone: boolean, id: string) {
        let item;

        if (isDone) {
            item = ListUtils.getItemById(this.doneList.listItems, id);
            this.doneList.listItems = ListUtils.removeItemFromList(this.doneList.listItems, this.doneList.listName, id);
            this.toDoList.addListItem(item);
        } else {
            item = ListUtils.getItemById(this.toDoList.listItems, id);
            this.toDoList.listItems = ListUtils.removeItemFromList(this.toDoList.listItems, this.toDoList.listName, id);
            this.doneList.addListItem(item);
        }
        localStorage.setItem('listItems', JSON.stringify(this.toDoList.listItems));
        localStorage.setItem('doneItems', JSON.stringify(this.doneList.listItems));
        this.onChange.emit();
    }
}