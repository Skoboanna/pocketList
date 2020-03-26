import { ListElementData } from './list-element.data'
import { Injectable, EventEmitter } from '@angular/core';
import ListUtils from './list-utils';

// @Injectable({
//     providedIn: 'root'
// })

export class ListService {
    public onChange = new EventEmitter();
    private listItems: ListElementData[] = [];
    private doneItems: ListElementData[] = [];

    public getListItems(): ListElementData[] {
        return this.listItems;
    }

    public getDoneItems(): ListElementData[] {
        return this.doneItems;
    }

    public addListItem(title: string) {
        this.listItems.push(new ListElementData(title));
        this.onChange.emit();
    }

    public removeItemFromList(isDone: boolean, id: string) {
        if (isDone) {
            this.doneItems = ListUtils.removeItemFromList(this.doneItems, id);
        } else {
            this.listItems = ListUtils.removeItemFromList(this.listItems, id);
        }
        this.onChange.emit();
    }

    public markListItemAsDone(id: string) { // refactor
        let doneItem = this.listItems.filter(item => item.id === id);
        this.listItems = ListUtils.removeItemFromList(this.listItems, id);
        this.doneItems = this.doneItems.concat(doneItem);
        this.onChange.emit();
    }

    public changeItemStatus(isDone: boolean, id: string) { //REFACTOR
        let item;

        if (isDone) {
            item = this.doneItems.filter(item => item.id === id);
            this.doneItems = ListUtils.removeItemFromList(this.doneItems, id);
            this.listItems = this.listItems.concat(item);
        } else {
            item = this.listItems.filter(item => item.id === id);
            this.listItems = ListUtils.removeItemFromList(this.listItems, id);
            this.doneItems = this.doneItems.concat(item);
        }
        this.onChange.emit();
    }
}