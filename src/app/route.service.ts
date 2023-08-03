import {Injectable} from '@angular/core';
import {Location} from "./location.interface";
//import {LOCATIONS} from "./mock-locations";
import map from '../assets/map.json'
import {PlayerAction} from './player-action.interface';
import {ActionType} from "./action-type.interface";
import {Item} from "./item.interface";
import {Enemy} from "./enemy.interface";
import {Dependencies} from "./dependencies.interface";

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  route: PlayerAction[] = [];
  map: any = map.locations;
  currentLocation: Location = this.getLocationAtIndex(0);

  constructor() { }

  getMap(): any {
    return this.map;
  }

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
      if (loc == undefined) {
        break;
      }
      if (!this.hasDependencies(loc)) {
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

  performUnlocksByLocation(srcLocationID:number, areaIDs: number[]): void {
    for (const ID of areaIDs) {
      this.getLocationAtIndex(ID).dependencies.locations = this.getLocationAtIndex(ID).dependencies.locations.filter(obj => obj !== srcLocationID);
      if (!this.getLocationAtIndex(ID).dependencies.hard_locked) {
        this.unlockAll(ID);
      }
    }
  }

  performUnlocksByEnemy(srcEnemyID:number, areaIDs: number[]): void {
    for (const ID of areaIDs) {
      this.getLocationAtIndex(ID).dependencies.enemies = this.getLocationAtIndex(ID).dependencies.enemies.filter(obj => obj !== srcEnemyID);
      if (!this.getLocationAtIndex(ID).dependencies.hard_locked) {
        this.unlockAll(ID);
      }
    }
  }

  performUnlocksByItem(srcItemID:number, areaIDs: number[]): void {
    for (const ID of areaIDs) {
      this.getLocationAtIndex(ID).dependencies.items = this.getLocationAtIndex(ID).dependencies.items.filter(obj => obj !== srcItemID);
      if (!this.getLocationAtIndex(ID).dependencies.hard_locked) {
        this.unlockAll(ID);
      }
    }
  }

  unlockAll(locationToBeUnlockedID: number):void {
    this.getLocationAtIndex(locationToBeUnlockedID).dependencies = {"locations":[],"enemies":[],"items":[],"hard_locked":false};
  }

  moveTo(ID: number): void {
    this.route.push({type: ActionType.GOTO, target: ID});
    this.currentLocation = this.getLocationAtIndex(ID);
    this.performUnlocksByLocation(ID, this.currentLocation.unlocks);
  }

  collect(ID: number): void {
    this.route.push({type: ActionType.PICKUP, target: ID});
    let theItem: Item | undefined = this.getItemAtCurrentLocationWithID(ID);
    if (typeof theItem === undefined || theItem == undefined) {
      console.log('Error, item with ID '+ ID + ' is undefined!');
    } else {
      // @ts-ignore
      this.performUnlocksByItem(ID, theItem.unlocks);
      // @ts-ignore
      theItem.collected = true;
    }
  }

  kill(ID: number): void {
    this.route.push({type: ActionType.KILL, target: ID});
    let enemy: Enemy | undefined = this.getEnemyAtCurrentLocationWithID(ID);
    if (typeof enemy === undefined || enemy == undefined) {
      console.log('Error, enemy with ID '+ ID + ' is undefined!');
    } else {
      // @ts-ignore
      this.performUnlocksByEnemy(ID, enemy.unlocks);
      // @ts-ignore
      enemy.killed = true;
    }
  }

  hasDependencies(loc: Location) {
    if (!(loc.dependencies.locations.length == 0)) {
      return true;
    }
    if (!(loc.dependencies.enemies.length == 0)) {
      return true;
    }
    if (!(loc.dependencies.items.length == 0)) {
      return true;
    }
    return false;
  }
}
