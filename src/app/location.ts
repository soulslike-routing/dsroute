import {Item} from "./item";
import {Enemy} from "./enemy";
import {Dependencies} from "./dependencies";

export interface Location {
  id: number;
  name: string;
  connections: number[];
  dependencies: Dependencies;
  unlocks: number[];
  items: Item[];
  enemies: Enemy[];
}
