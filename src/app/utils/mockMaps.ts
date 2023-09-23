import { Location } from "../location.interface";

class MapFactory {
  constructor() {}

  twoEmptyLocations(): Location[] {
    return [{
      "id": 0,
      "name": "location0",
      "connections": [1],
      "dependencies": { "locations": [], "enemies": [], "items": [], "hard_locked": false },
      "unlocks": [],
      "items": [],
      "enemies": []
    },
    {
      "id": 1,
      "name": "location1",
      "connections": [0],
      "dependencies": { "locations": [], "enemies": [], "items": [], "hard_locked": false },
      "unlocks": [],
      "items": [],
      "enemies": []
    }];
  }

  threeEmptyLocations(): Location[] {
    return [{
      "id": 0,
      "name": "location0",
      "connections": [1],
      "dependencies": {"locations": [], "enemies": [], "items": [], "hard_locked": false},
      "unlocks": [],
      "items": [],
      "enemies": []
    },
    {
      "id": 1,
      "name": "location1",
      "connections": [0, 2],
      "dependencies": {"locations": [], "enemies": [], "items": [], "hard_locked": false},
      "unlocks": [],
      "items": [],
      "enemies": []
    },
    {
      "id": 2,
      "name": "location2",
      "connections": [1],
      "dependencies": {"locations": [], "enemies": [], "items": [], "hard_locked": false},
      "unlocks": [],
      "items": [],
      "enemies": []
      }];
  }

  singleLockedLocations(): Location[] {
    return [{
      "id": 0,
      "name": "location0",
      "connections": [1],
      "dependencies": { "locations": [], "enemies": [], "items": [], "hard_locked": false },
      "unlocks": [],
      "items": [],
      "enemies": [
        { "id": 0, "name": "enemy0", "unlocks": [1], "killed": false, "respawns": false },
      ]
    },
      {
        "id": 1,
        "name": "location1",
        "connections": [0],
        "dependencies": { "locations": [], "enemies": [0], "items": [], "hard_locked": false },
        "unlocks": [],
        "items": [],
        "enemies": []
      }]
  }

  softLockedLocations(): Location[] {
    return [{
      "id": 0,
      "name": "location0",
      "connections": [1],
      "dependencies": { "locations": [], "enemies": [], "items": [], "hard_locked": false },
      "unlocks": [],
      "items": [],
      "enemies": [
        { "id": 0, "name": "enemy0", "unlocks": [1], "killed": false, "respawns": false },
        { "id": 1, "name": "enemy1", "unlocks": [1], "killed": false, "respawns": false }
      ]
    },
    {
      "id": 1,
      "name": "location1",
      "connections": [0],
      "dependencies": { "locations": [], "enemies": [0, 1], "items": [], "hard_locked": false },
      "unlocks": [],
      "items": [],
      "enemies": []
    }]
  }

  hardLockedLocations(): Location[] {
    return [{
      "id": 0,
      "name": "location0",
      "connections": [1],
      "dependencies": { "locations": [], "enemies": [], "items": [], "hard_locked": false },
      "unlocks": [],
      "items": [],
      "enemies": [
        { "id": 0, "name": "enemy0", "unlocks": [1], "killed": false, "respawns": false },
        { "id": 1, "name": "enemy1", "unlocks": [1], "killed": false, "respawns": false }
      ]
    },
    {
      "id": 1,
      "name": "location1",
      "connections": [0],
      "dependencies": { "locations": [], "enemies": [0, 1], "items": [], "hard_locked": true },
      "unlocks": [],
      "items": [],
      "enemies": []
    }]
  }

  invalidRoutes() : Location[] {
    return [{
      "id": 0,
      "name": "location0",
      "connections": [1],
      "dependencies": {"locations": [], "enemies": [], "items": [], "hard_locked": false},
      "unlocks": [],
      "items": [],
      "enemies": []
    },
    {
      "id": 1,
      "name": "location1",
      "connections": [0, 2],
      "dependencies": {"locations": [], "enemies": [], "items": [], "hard_locked": false},
      "unlocks": [],
      "items": [],
      "enemies": []
    },
    {
      "id": 2,
      "name": "location2",
      "connections": [1],
      "dependencies": {"locations": [], "enemies": [], "items": [], "hard_locked": false},
      "unlocks": [],
      "items": [],
      "enemies": []
    },
    {
      "id": 3,
      "name": "location3",
      "connections": [],
      "dependencies": {"locations": [], "enemies": [], "items": [], "hard_locked": false},
      "unlocks": [],
      "items": [],
      "enemies": []
    }];
  }
}

export default MapFactory;
