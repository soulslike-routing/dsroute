import { ActionType } from "./action-type.interface";

export interface PlayerAction {
  type: ActionType;
  target: number;
  dependenciesRemovedFrom: number[];
}

