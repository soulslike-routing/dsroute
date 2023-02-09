import { ActionType } from "./action-type";

export interface PlayerAction {
  type: ActionType;
  target: number;
}

