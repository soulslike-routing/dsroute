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

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load the map from json file', () => {
    expect(service.getMap()).toEqual(map["locations"]);
  });

  it('should start with empty route', () => {
    expect(service.getRoute().length).toBe(0);
  });

  it('should start at location Northern Undead Asylum', () => {
    expect(service.getCurrentLocation()).toBe(map["locations"][0]);
    expect(service.getCurrentLocation().name).toEqual("Northern Undead Asylum");
  });

  it('should return the correct location at index', () => {
    expect(service.getLocationAtIndex(4)).toBe(map["locations"][4]);
    expect(service.getLocationAtIndex(10)).toBe(map["locations"][10]);
    expect(service.getLocationAtIndex(12)).toBe(map["locations"][12]);
  });

  it('should correctly store movements', () => {
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
});
