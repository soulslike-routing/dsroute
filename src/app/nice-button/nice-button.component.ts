import {Component, EventEmitter, Input, Output} from '@angular/core';
import { Displayable } from "../displayable.interface";
import {RouteService} from "../route.service";
import {Location} from "../location.interface";
import {Enemy} from "../enemy.interface";
import {Item} from "../item.interface";

@Component({
  selector: 'dsr-nice-button',
  templateUrl: './nice-button.component.html',
  styleUrls: ['./nice-button.component.css']
})
export class NiceButtonComponent {
  @Input() displayable!:Displayable;
  @Output() onClick: EventEmitter<any> = new EventEmitter();
  @Input() icon: String = "";

  constructor(private routeService:RouteService) {
  }

  interact(): void {
   this.onClick.emit(this.displayable.id);
  }
}
