import { Component, OnInit } from '@angular/core';
import { ListElementData } from '../list-element.data'
import { ListService } from '../list.service'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [ListService]
})
export class ListComponent implements OnInit {
  title: string;

  listItems: ListElementData[];
  doneItems: ListElementData[];

  constructor(private listService: ListService) { }

  ngOnInit() {
    this.listService.onChange.subscribe(() => this.reloadListItems());
  }

  reloadListItems() {
    this.listItems = this.listService.getListItems();
    this.doneItems = this.listService.getDoneItems();
  }

  addListItem() {
    this.listService.addListItem(this.title);
  }




}
