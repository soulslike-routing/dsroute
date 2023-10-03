import {RouteService} from "./route.service";
import {Route} from "@angular/router";
import {PlayerAction} from "./player-action.interface";
import {last} from "./utils/arrayHelpers";
import {ActionType} from "./action-type.interface";
import {Item} from "./item.interface";
import {Enemy} from "./enemy.interface";

export class Undoworker {

  routeService: RouteService;

  constructor(routesSrvice: RouteService) {
    this.routeService = routesSrvice;
  }

  undoAction(action: PlayerAction): void {
    if (action == last(this.routeService.route)) {
      this.undoLastAction(action);
    } else {
      this.undoMiddleAction(action);
    }
  }

  undoLastAction(action: PlayerAction): void {
    if (action.dependenciesRemovedFrom.length == 0) {
      this.undoLastNonUnlockingAction(action);
    } else {
      this.undoLastUnlockingAction(action);
    }
  }

  undoLastNonUnlockingAction(action: PlayerAction): void {
    if (action.type == ActionType.GOTO) {
      this.undoLastNonUnlockingMoveAction(action);
    } else if (action.type == ActionType.PICKUP) {
      this.undoLastNonUnlockingPickupAction(action);
    } else if (action.type == ActionType.KILL) {
      this.undoLastNonUnlockingKillAction(action);
    }
    this.routeService.route.pop();
  }

  undoLastNonUnlockingMoveAction(action: PlayerAction): void {
    this.routeService.currentLocation = this.routeService.mapService.getLocationAtIndex(action.origin);
  }

  undoLastNonUnlockingPickupAction(action: PlayerAction): void {
    const theItem: Item = this.routeService.getObjOfTypeAtCurrentLocationWithID("items", action.target) as Item;
    theItem.collected = false;
  }

  undoLastNonUnlockingKillAction(action: PlayerAction): void {
    const theEnemy: Enemy = this.routeService.getObjOfTypeAtCurrentLocationWithID("enemies", action.target) as Enemy;
    theEnemy.killed = false;
  }

  undoLastUnlockingAction(action: PlayerAction): void {
    console.log("Removing an action that unlocked something isn't supported yet...");
  }

  undoMiddleAction(action: PlayerAction): void {
    console.log("Removing an action that isn't the last one is not implemented yet...");
  }

}
