export interface Enemy {
  id: number;
  name: string;
  killed: boolean;
  respawns: boolean;
  unlocks: number[];
}
