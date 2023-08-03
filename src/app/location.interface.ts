import {Item} from "./item.interface";
import {Enemy} from "./enemy.interface";
import {Dependencies} from "./dependencies.interface";

export interface Location {
  id: number;
  name: string;
  connections: number[];
  dependencies: Dependencies;
  unlocks: number[];
  items: Item[];
  enemies: Enemy[];
}
