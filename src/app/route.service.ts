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

  getObjOfTypeAtCurrentLocationWithID(objType: "items" | "enemies", ID: number): Item | Enemy | undefined {
    for (let obj of this.currentLocation[objType]) {
      if (obj.id == ID) {
        return obj;
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

  // TODO Write tests for unlocking in general
  performUnlocksBy(key: "locations" | "enemies" | "items", srcObjID:number, areaIDs: number[]): number[] {
    let areasWhereDependenciesGotModified: number[] = [];
    for (const ID of areaIDs) {

      // This line removes the srcObject from the area's dependencies
      // TODO Refactor this into external method and test it properly
      const originalDependencies: number[] = [...this.getLocationAtIndex(ID).dependencies[key]];
      this.getLocationAtIndex(ID).dependencies[key] = this.getLocationAtIndex(ID).dependencies[key].filter(obj => obj !== srcObjID);
      areasWhereDependenciesGotModified = originalDependencies.filter((element) => !this.getLocationAtIndex(ID).dependencies[key].includes(element));

      if (!this.getLocationAtIndex(ID).dependencies.hard_locked) {
        this.unlockAllDependencies(ID);
      }
    }
    return areasWhereDependenciesGotModified;
  }

  // Most locations are not hard locked, so that any of the possibly multiple dependencies might be used to unlock the location
  // This method can then be used to remove all further dependecies
  unlockAllDependencies(locationToBeUnlockedID: number):void {
    const loc: Location = this.getLocationAtIndex(locationToBeUnlockedID);
    const isHardLocked = loc.dependencies.hard_locked;
    loc.dependencies = {"locations":[],"enemies":[],"items":[],"hard_locked":isHardLocked};
  }

  moveTo(ID: number): void {
    if (this.possibleLocations().find(e => e.id == ID)) {
      const areasWhereDependenciesGotModified:number[] = this.performUnlocksBy("locations", ID, this.currentLocation.unlocks);
      this.route.push({type: ActionType.GOTO, target: ID, dependenciesRemovedFrom: areasWhereDependenciesGotModified});
      this.currentLocation = this.getLocationAtIndex(ID);
    } else {
      console.log("Error, tried to move to invalid location");
    }
  }

  collect(ID: number): void {
    let theItem: Item | undefined = this.getObjOfTypeAtCurrentLocationWithID("items", ID) as Item | undefined;
    if (typeof theItem === undefined || theItem == undefined) {
      console.log('Error, item with ID '+ ID + ' is undefined!');
    } else {
      const areasWhereDependenciesGotModified:number[] = this.performUnlocksBy("items", ID, theItem.unlocks);
      this.route.push({type: ActionType.PICKUP, target: ID, dependenciesRemovedFrom: areasWhereDependenciesGotModified});
      // @ts-ignore
      theItem.collected = true;
    }
  }

  kill(ID: number): void {
    let enemy: Enemy | undefined = this.getObjOfTypeAtCurrentLocationWithID("enemies", ID) as Enemy | undefined;
    if (typeof enemy === undefined || enemy == undefined) {
      console.log('Error, enemy with ID '+ ID + ' is undefined!');
    } else {
      const areasWhereDependenciesGotModified:number[] = this.performUnlocksBy("enemies", ID, enemy.unlocks);
      this.route.push({type: ActionType.KILL, target: ID, dependenciesRemovedFrom: areasWhereDependenciesGotModified});
      // @ts-ignore
      enemy.killed = true;
    }
  }

  undoAction(action: PlayerAction): void {
    // TODO extend placerAction interface to store info if it actually unlocked anything
    // and if yes, what
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
