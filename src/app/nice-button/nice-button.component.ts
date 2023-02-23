import {Component, EventEmitter, Input, Output} from '@angular/core';
import { Displayable } from "../displayable";
import {RouteService} from "../route.service";

@Component({
  selector: 'dsr-nice-button',
  templateUrl: './nice-button.component.html',
  styleUrls: ['./nice-button.component.css']
})
export class NiceButtonComponent {
  @Input() displayable!:Displayable;
  @Output() onClick: EventEmitter<any> = new EventEmitter();

  constructor(private routeService:RouteService) {
  }

  interact(): void {
   this.onClick.emit(this.displayable.id);
  }
}
