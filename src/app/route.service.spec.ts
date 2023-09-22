import { TestBed } from '@angular/core/testing';
import map from '../assets/map.json'
import { RouteService } from './route.service';
import {ActionType} from "./action-type.interface";

describe('RouteService', () => {
  let service: RouteService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [RouteService] });
    service = TestBed.inject(RouteService);
  });

  it('creates', () => {
    expect(service).toBeTruthy();
  });

  it('loads the map from json file', () => {
    expect(service.getMap()).toEqual(map["locations"]);
  });

  it('starts with empty route', () => {
    expect(service.getRoute().length).toBe(0);
  });

  it('starts at location Northern Undead Asylum', () => {
    expect(service.getCurrentLocation()).toBe(map["locations"][0]);
    expect(service.getCurrentLocation().name).toEqual("Northern Undead Asylum");
  });

  it('returns the correct location at index', () => {
    expect(service.getLocationAtIndex(4)).toBe(map["locations"][4]);
    expect(service.getLocationAtIndex(10)).toBe(map["locations"][10]);
    expect(service.getLocationAtIndex(12)).toBe(map["locations"][12]);
  });

  it('correctly stores movements', () => {
   service.map = [{
      "id": 0,
      "name": "my_epic_locationname",
      "connections": [1],
      "dependencies": {"locations": [], "enemies": [], "items": [], "hard_locked": false},
      "unlocks": [],
      "items": [],
      "enemies": []
    },
    {
      "id": 1,
      "name": "my_second_location",
      "connections": [0, 2],
      "dependencies": {"locations": [], "enemies": [], "items": [], "hard_locked": false},
      "unlocks": [],
      "items": [],
      "enemies": []
    },
    {
      "id": 2,
      "name": "my_third_location",
      "connections": [1],
      "dependencies": {"locations": [], "enemies": [], "items": [], "hard_locked": false},
      "unlocks": [],
      "items": [],
      "enemies": []
    }];
    service.currentLocation = service.getLocationAtIndex(0);

    expect(service.getRoute().length).toBe(0);

    service.moveTo(1);
    expect(service.getRoute().length).toBe(1);
    expect(service.getRoute()).toEqual([
      {type: ActionType.GOTO, target: 1, dependenciesRemovedFrom: []}
    ]);

    service.moveTo(0);
    expect(service.getRoute().length).toBe(2);
    expect(service.getRoute()).toEqual([
        {type: ActionType.GOTO, target: 1, dependenciesRemovedFrom: []},
        {type: ActionType.GOTO, target: 0, dependenciesRemovedFrom: []}
      ]);

    service.moveTo(1);
    service.moveTo(2);
    expect(service.getRoute().length).toBe(4);
    expect(service.getRoute()).toEqual([
      {type: ActionType.GOTO, target: 1, dependenciesRemovedFrom: []},
      {type: ActionType.GOTO, target: 0, dependenciesRemovedFrom: []},
      {type: ActionType.GOTO, target: 1, dependenciesRemovedFrom: []},
      {type: ActionType.GOTO, target: 2, dependenciesRemovedFrom: []}
    ]);
  });

  it('refuses to store invalid moves in route', () => {
   service.map = [{
      "id": 0,
      "name": "my_epic_locationname",
      "connections": [1],
      "dependencies": {"locations": [], "enemies": [], "items": [], "hard_locked": false},
      "unlocks": [],
      "items": [],
      "enemies": []
    },
    {
      "id": 1,
      "name": "my_second_location",
      "connections": [0, 2],
      "dependencies": {"locations": [], "enemies": [], "items": [], "hard_locked": false},
      "unlocks": [],
      "items": [],
      "enemies": []
    },
    {
      "id": 2,
      "name": "my_third_location",
      "connections": [1],
      "dependencies": {"locations": [], "enemies": [], "items": [], "hard_locked": false},
      "unlocks": [],
      "items": [],
      "enemies": []
    },
    {
      "id": 3,
      "name": "my_secret_location",
      "connections": [],
      "dependencies": {"locations": [], "enemies": [], "items": [], "hard_locked": false},
      "unlocks": [],
      "items": [],
      "enemies": []
    }];
    service.currentLocation = service.getLocationAtIndex(0);

    expect(service.getRoute().length).toBe(0);

    service.moveTo(1);
    service.moveTo(2);
    service.moveTo(3);
    expect(service.getRoute().length).toBe(2);
    expect(service.getRoute()).toEqual([
      {type: ActionType.GOTO, target: 1, dependenciesRemovedFrom: []},
      {type: ActionType.GOTO, target: 2, dependenciesRemovedFrom: []}
    ]);
  });

  describe('unlocking', () => {
    it('accesses unlocked objects', () => {
      const loc1 = {
        "id": 0,
        "name": "my_epic_locationname",
        "connections": [1],
        "dependencies": {"locations": [], "enemies": [], "items": [], "hard_locked": false},
        "unlocks": [],
        "items": [],
        "enemies": []
      };
      const loc2 = {
        "id": 1,
        "name": "my_second_location",
        "connections": [0],
        "dependencies": {"locations": [], "enemies": [], "items": [], "hard_locked": false},
        "unlocks": [],
        "items": [],
        "enemies": []
      }
      service.map = [loc1, loc2];
      service.currentLocation = loc1;

      service.moveTo(1);
      expect(service.getCurrentLocation()).toEqual(loc2);
    });

    it('refuses to access locked objects', () => {
      const loc1 = {
        "id": 0,
        "name": "my_epic_locationname",
        "connections": [1],
        "dependencies": {"locations": [], "enemies": [], "items": [], "hard_locked": false},
        "unlocks": [],
        "items": [],
        "enemies": [
          {"id": 0, "name": "Asylum Demon", "unlocks": [1], "killed": false, "respawns": false},
        ]
      };
      const loc2 = {
        "id": 1,
        "name": "my_second_location",
        "connections": [0],
        "dependencies": {"locations": [], "enemies": [0], "items": [], "hard_locked": false},
        "unlocks": [],
        "items": [],
        "enemies": []
      }
      service.map = [loc1, loc2];
      service.currentLocation = loc1;

      service.moveTo(1);
      expect(service.getCurrentLocation()).toEqual(loc1);
    });

    it('correctly unlocks objects once their dependency has been resolved', () => {
      const loc1 = {
        "id": 0,
        "name": "my_epic_locationname",
        "connections": [1],
        "dependencies": {"locations": [], "enemies": [], "items": [], "hard_locked": false},
        "unlocks": [],
        "items": [],
        "enemies": [
          {"id": 0, "name": "Asylum Demon", "unlocks": [1], "killed": false, "respawns": false},
        ]
      };
      const loc2 = {
        "id": 1,
        "name": "my_second_location",
        "connections": [0],
        "dependencies": {"locations": [], "enemies": [0], "items": [], "hard_locked": false},
        "unlocks": [],
        "items": [],
        "enemies": []
      }
      service.map = [loc1, loc2];
      service.currentLocation = loc1;

      service.kill(0)
      service.moveTo(1);
      expect(service.getCurrentLocation()).toEqual(loc2);
    });

    it('correctly unlocks softlocked objects when any of their dependencies get resolved', () => {
      const loc1 = {
        "id": 0,
        "name": "my_epic_locationname",
        "connections": [1],
        "dependencies": {"locations": [], "enemies": [], "items": [], "hard_locked": false},
        "unlocks": [],
        "items": [],
        "enemies": [
          {"id": 0, "name": "Asylum Demon", "unlocks": [1], "killed": false, "respawns": false},
          {"id": 1, "name": "Asylum Demon but epic", "unlocks": [1], "killed": false, "respawns": false},
        ]
      };
      const loc2 = {
        "id": 1,
        "name": "my_second_location",
        "connections": [0],
        "dependencies": {"locations": [], "enemies": [0, 1], "items": [], "hard_locked": false},
        "unlocks": [],
        "items": [],
        "enemies": []
      }
      service.map = [loc1, loc2];
      service.currentLocation = loc1;

      service.kill(1)
      service.moveTo(1);
      expect(service.getCurrentLocation()).toEqual(loc2);
    });

    it('does not unlock hardlocked objects when only part of their dependencies get resolved', () => {
      const loc1 = {
        "id": 0,
        "name": "my_epic_locationname",
        "connections": [1],
        "dependencies": {"locations": [], "enemies": [], "items": [], "hard_locked": false},
        "unlocks": [],
        "items": [],
        "enemies": [
          {"id": 0, "name": "Asylum Demon", "unlocks": [1], "killed": false, "respawns": false},
          {"id": 1, "name": "Asylum Demon but epic", "unlocks": [1], "killed": false, "respawns": false},
        ]
      };
      const loc2 = {
        "id": 1,
        "name": "my_second_location",
        "connections": [0],
        "dependencies": {"locations": [], "enemies": [0, 1], "items": [], "hard_locked": true},
        "unlocks": [],
        "items": [],
        "enemies": []
      }
      service.map = [loc1, loc2];
      service.currentLocation = loc1;

      service.kill(1)
      service.moveTo(1);
      expect(service.getCurrentLocation()).toEqual(loc1);
    });

    it('unlocks hardlocked ojects if all their dependencies are resolved', () => {
      const loc1 = {
        "id": 0,
        "name": "my_epic_locationname",
        "connections": [1],
        "dependencies": {"locations": [], "enemies": [], "items": [], "hard_locked": false},
        "unlocks": [],
        "items": [],
        "enemies": [
          {"id": 0, "name": "Asylum Demon", "unlocks": [1], "killed": false, "respawns": false},
          {"id": 1, "name": "Asylum Demon but epic", "unlocks": [1], "killed": false, "respawns": false},
        ]
      };
      const loc2 = {
        "id": 1,
        "name": "my_second_location",
        "connections": [0],
        "dependencies": {"locations": [], "enemies": [0, 1], "items": [], "hard_locked": true},
        "unlocks": [],
        "items": [],
        "enemies": []
      }
      service.map = [loc1, loc2];
      service.currentLocation = loc1;

      service.kill(0)
      service.kill(1)
      service.moveTo(1);
      expect(service.getCurrentLocation()).toEqual(loc2);
    });

    // TODO test areaswheredependenciesgotmodified
  });
});
