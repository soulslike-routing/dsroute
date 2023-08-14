import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PlayerAction} from "../../player-action.interface";
import {ActionType} from "../../action-type.interface";
import {RouteService} from "../../route.service";

@Component({
  selector: 'dsr-edit-action-modal',
  templateUrl: './edit-action-modal.component.html',
  styleUrls: ['./edit-action-modal.component.css']
})
export class EditActionModalComponent {
  @Input() action: PlayerAction|null= null;
  @Output() stateChanged = new EventEmitter();

  constructor(private routeService: RouteService) {}
}
