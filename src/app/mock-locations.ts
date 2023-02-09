import { Location } from './location';

export const LOCATIONS: Location[] = [
  {
    id: 0,
    name: 'Undead Asylum',
    connections: [1],
    locked: false,
    unlocks: [],
    items: [],
    enemies: [{id: 0, name: 'Asylum Demon', unlocks: [1], killed: false, respawns: false}]
  },
  {id: 1, name: 'Firelink', connections: [0, 2, 3], locked: true, unlocks: [2], items: [], enemies: []},
  {id: 2, name: 'Undead Burg', connections: [1, 3], locked: true, unlocks: [3], items: [], enemies: []},
  {id: 3, name: 'Undead Parish', connections: [1, 2], locked: true, unlocks: [], items: [], enemies: []},
];
