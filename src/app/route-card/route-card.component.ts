import {ChangeDetectorRef, Component} from '@angular/core';
import {RouteService} from "../route.service";
import {PlayerAction} from "../player-action.interface";
import {ActionType} from "../action-type.interface";

@Component({
  selector: 'dsr-route-card',
  templateUrl: './route-card.component.html',
  styleUrls: ['./route-card.component.css']
})
export class RouteCardComponent {

  actionTypeEnumReference = ActionType;
  playerActions: PlayerAction[] = this.routeService.getRoute();

  constructor(private routeService: RouteService, private ref: ChangeDetectorRef) {}

  ngOnInit() {
    this.playerActions = this.routeService.getRoute();
  }

  onStateChange(): void {
    this.playerActions = this.routeService.getRoute();
  }
}
