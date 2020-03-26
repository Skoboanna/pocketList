import { Component, OnInit, Input } from '@angular/core';
import { ListElementData } from '../list-element.data'
import { ListService } from '../list.service';

@Component({
  selector: 'list-element',
  templateUrl: './list-element.component.html',
  styleUrls: ['./list-element.component.scss']
})
export class ListElementComponent implements OnInit {

  @Input()
  public item: ListElementData;

  @Input()
  public isDone: boolean;

  constructor(
    private listService: ListService
  ) { }

  ngOnInit() { }

  removeItem() {
    this.listService.removeItemFromList(this.isDone, this.item.id);
  }

  editItem() { }

  markAsDone() {
    if (!this.isDone) {
      this.listService.changeItemStatus(this.isDone, this.item.id);
    } else {
      this.listService.changeItemStatus(this.isDone, this.item.id);
    }
  }
}



