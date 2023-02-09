import {Component, EventEmitter, Input, Output} from '@angular/core';
import {RouteService} from "../route.service";
import {Item} from "../item";

@Component({
  selector: 'dsr-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent {
  @Input() possibleItems: Item[] = [];
  @Output() stateChanged = new EventEmitter();

  constructor(private routeService: RouteService) {}

  collect(ID: number): void {
    this.routeService.collect(ID);
    this.stateChanged.emit();
  }
}
