import {Component, EventEmitter, Input, Output} from '@angular/core';
import {RouteService} from "../route.service";
import { Location } from '../location';

@Component({
  selector: 'dsr-movement',
  templateUrl: './movement.component.html',
  styleUrls: ['./movement.component.css']
})
export class MovementComponent {
  @Input() possibleMovements: Location[] = [];
  @Output() stateChanged = new EventEmitter();

  constructor(private routeService: RouteService) {}

  moveTo(ID: number): void {
    this.routeService.moveTo(ID);
    this.stateChanged.emit();
  }
}
