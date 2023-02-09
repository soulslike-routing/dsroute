import {Injectable} from '@angular/core';
import {Location} from "./location";
import {LOCATIONS} from "./mock-locations";
import {PlayerAction} from './player-action';
import {ActionType} from "./action-type";
import {Item} from "./item";
import {Enemy} from "./enemy";

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  route: PlayerAction[] = [];
  map: Location[] = structuredClone(LOCATIONS);
  currentLocation: Location = this.getLocationAtIndex(0);

  constructor() { }

  getRoute(): PlayerAction[] {
    return this.route;
  }

  getCurrentLocation(): Location {
    return this.currentLocation;
  }

  getLocationAtIndex(index: number):Location {
    return this.map[index];
  }

  getItemAtCurrentLocationWithID(ID: number): Item | undefined {
    for (let item of this.currentLocation.items) {
      if (item.id == ID) {
        return item;
      }
    }
    return undefined;
  }

  getEnemyAtCurrentLocationWithID(ID: number): Enemy | undefined {
    for (let enemy of this.currentLocation.enemies) {
      if (enemy.id == ID) {
        return enemy;
      }
    }
    return undefined;
  }

  possibleLocations(): Location[] {
    let possible: Location[] = [];
    for (const locID of this.currentLocation.connections) {
      let loc = this.getLocationAtIndex(locID);
      if (!loc.locked) {
        possible.push(loc);
      }
    }
    return possible;
  }

  possibleItems(): Item[] {
    let possible: Item[] = [];
    for (const item of this.currentLocation.items) {
      if (!item.collected) {
        possible.push(item);
      }
    }
    return possible;
  }

  possibleEnemies(): Enemy[] {
    let possible: Enemy[] = [];
    for (const enemy of this.currentLocation.enemies) {
      if (!enemy.killed || enemy.respawns) {
        possible.push(enemy);
      }
    }
    return possible;
  }

  performUnlocks(areaIDs: number[]): void {
    for (const ID of areaIDs) {
      this.getLocationAtIndex(ID).locked = false;
    }
  }

  moveTo(ID: number): void {
    this.route.push({type: ActionType.GOTO, target: ID});
    this.currentLocation = this.getLocationAtIndex(ID);
    this.performUnlocks(this.currentLocation.unlocks);
  }

  collect(ID: number): void {
    this.route.push({type: ActionType.PICKUP, target: ID});
    let theItem: Item | undefined = this.getItemAtCurrentLocationWithID(ID);
    if (typeof theItem === undefined) {
      console.log('Error, item with ID '+ ID + ' is undefined!');
    } else {
      // @ts-ignore
      this.performUnlocks(theItem.unlocks);
      // @ts-ignore
      theItem.collected = true;
    }
  }

  kill(ID: number): void {
    this.route.push({type: ActionType.KILL, target: ID});
    let enemy: Enemy | undefined = this.getEnemyAtCurrentLocationWithID(ID);
    if (typeof enemy === undefined) {
      console.log('Error, enemy with ID '+ ID + ' is undefined!');
    } else {
      // @ts-ignore
      this.performUnlocks(enemy.unlocks);
      // @ts-ignore
      enemy.killed = true;
    }
  }
}
