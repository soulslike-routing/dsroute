import { Location } from "../location.interface";

// TODO somehow further split and sort this, either into more factories or just good functions
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

  basicItem(): Location[] {
    return [{
      "id": 0,
      "name": "location0",
      "connections": [1],
      "dependencies": { "locations": [], "enemies": [], "items": [], "hard_locked": false },
      "unlocks": [],
      "items": [
        {"id": 0, "name": "item0", "collected": false, "count":  1, "unlocks": []},
      ],
      "enemies": []
    }];
  }

  basicEnemy(): Location[] {
    return [{
      "id": 0,
      "name": "location0",
      "connections": [1],
      "dependencies": { "locations": [], "enemies": [], "items": [], "hard_locked": false },
      "unlocks": [],
      "items": [],
      "enemies": [
        { "id": 0, "name": "enemy0", "unlocks": [], "killed": false, "respawns": false },
      ]
    }];
  }

  unlockByMovement(): Location[] {
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
      "unlocks": [2],
      "items": [],
      "enemies": []
    },
    {
      "id": 2,
      "name": "location2",
      "connections": [1],
      "dependencies": {"locations": [1], "enemies": [], "items": [], "hard_locked": false},
      "unlocks": [],
      "items": [],
      "enemies": []
    }];
  }

  unlockByItem(): Location[] {
    return [{
      "id": 0,
      "name": "location0",
      "connections": [1],
      "dependencies": {"locations": [], "enemies": [], "items": [], "hard_locked": false},
      "unlocks": [],
      "items": [
        {"id": 0, "name": "item0", "collected": false, "count":  1, "unlocks": [1]},
      ],
      "enemies": []
    },
    {
      "id": 1,
      "name": "location1",
      "connections": [0],
      "dependencies": {"locations": [], "enemies": [], "items": [0], "hard_locked": false},
      "unlocks": [],
      "items": [],
      "enemies": []
    }];
  }

  unlockByEnemy(): Location[] {
    return [{
      "id": 0,
      "name": "location0",
      "connections": [1],
      "dependencies": {"locations": [], "enemies": [], "items": [], "hard_locked": false},
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
      "dependencies": {"locations": [], "enemies": [0], "items": [], "hard_locked": false},
      "unlocks": [],
      "items": [],
      "enemies": []
    }];
  }

  stackingSoftlocksLocation(): Location[] {
    return [{
      "id": 0,
      "name": "location0",
      "connections": [1, 2],
      "dependencies": {"locations": [], "enemies": [], "items": [], "hard_locked": false},
      "unlocks": [],
      "items": [],
      "enemies": []
    },
    {
      "id": 1,
      "name": "location1",
      "connections": [0, 2, 3],
      "dependencies": {"locations": [], "enemies": [], "items": [], "hard_locked": false},
      "unlocks": [3],
      "items": [],
      "enemies": []
    },
    {
      "id": 2,
      "name": "location2",
      "connections": [0, 1, 3],
      "dependencies": {"locations": [], "enemies": [], "items": [], "hard_locked": false},
      "unlocks": [3],
      "items": [],
      "enemies": []
    },
    {
      "id": 3,
      "name": "location3",
      "connections": [1, 2],
      "dependencies": {"locations": [1, 2], "enemies": [], "items": [], "hard_locked": false},
      "unlocks": [],
      "items": [],
      "enemies": []
    }];
  }

  stackingSoftlocksItem(): Location[] {
    return [{
      "id": 0,
      "name": "location0",
      "connections": [1],
      "dependencies": {"locations": [], "enemies": [], "items": [], "hard_locked": false},
      "unlocks": [],
      "items": [
        {"id": 0, "name": "item0", "collected": false, "count":  1, "unlocks": [1]},
        {"id": 1, "name": "item1", "collected": false, "count":  1, "unlocks": [1]},
      ],
      "enemies": []
    },
    {
      "id": 1,
      "name": "location1",
      "connections": [0],
      "dependencies": {"locations": [], "enemies": [], "items": [0, 1], "hard_locked": false},
      "unlocks": [],
      "items": [],
      "enemies": []
    }];
  }

  stackingSoftlocksEnemies(): Location[] {
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
      }];
  }

  hardLockedLocationByLocations(): Location[] {
    return [{
      "id": 0,
      "name": "location0",
      "connections": [1, 2],
      "dependencies": {"locations": [], "enemies": [], "items": [], "hard_locked": false},
      "unlocks": [],
      "items": [],
      "enemies": []
    },
      {
        "id": 1,
        "name": "location1",
        "connections": [0, 2, 3],
        "dependencies": {"locations": [], "enemies": [], "items": [], "hard_locked": false},
        "unlocks": [3],
        "items": [],
        "enemies": []
      },
      {
        "id": 2,
        "name": "location2",
        "connections": [0, 1, 3],
        "dependencies": {"locations": [], "enemies": [], "items": [], "hard_locked": false},
        "unlocks": [3],
        "items": [],
        "enemies": []
      },
      {
        "id": 3,
        "name": "location3",
        "connections": [1, 2],
        "dependencies": {"locations": [1, 2], "enemies": [], "items": [], "hard_locked": true},
        "unlocks": [],
        "items": [],
        "enemies": []
      }];
  }

  hardLockedLocationByItems(): Location[] {
    return [{
      "id": 0,
      "name": "location0",
      "connections": [1],
      "dependencies": { "locations": [], "enemies": [], "items": [], "hard_locked": false },
      "unlocks": [],
      "items": [
        {"id": 0, "name": "item0", "collected": false, "count":  1, "unlocks": [1]},
        {"id": 1, "name": "item1", "collected": false, "count":  1, "unlocks": [1]},
      ],
      "enemies": []
    },
      {
        "id": 1,
        "name": "location1",
        "connections": [0],
        "dependencies": { "locations": [], "enemies": [], "items": [0, 1], "hard_locked": true },
        "unlocks": [],
        "items": [],
        "enemies": []
      }]
  }

  hardLockedLocationByEnemies(): Location[] {
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
