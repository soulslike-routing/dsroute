import {Item} from "./item";
import {Enemy} from "./enemy";

export interface Location {
  id: number;
  name: string;
  connections: number[];
  locked: boolean;
  unlocks: number[];
  items: Item[];
  enemies: Enemy[];
}
