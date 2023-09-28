import { Injectable } from '@angular/core';
import map from '../assets/map.json'
import {Location} from "./location.interface";

@Injectable({
  providedIn: 'root'
})
export class MapService {
  map: any = map.locations;

  constructor() { }

  getMap(): any {
    return this.map;
  }

  getLocationAtIndex(index: number):Location {
    return this.map[index];
  }
}
