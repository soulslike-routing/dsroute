import {Component, EventEmitter, Input, Output} from '@angular/core';
import { Displayable } from "../displayable";
import {RouteService} from "../route.service";
import {Location} from "../location";
import {Enemy} from "../enemy";
import {Item} from "../item";

@Component({
  selector: 'dsr-nice-button',
  templateUrl: './nice-button.component.html',
  styleUrls: ['./nice-button.component.css']
})
export class NiceButtonComponent {
  @Input() displayable!:any;
  @Output() onClick: EventEmitter<any> = new EventEmitter();
  @Input() icon: String = "";

  constructor(private routeService:RouteService) {
  }

  interact(): void {
   this.onClick.emit(this.displayable.id);
  }
}
