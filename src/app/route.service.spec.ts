import { TestBed } from '@angular/core/testing';
import map from '../assets/map.json'
import { RouteService } from './route.service';
import {ActionType} from "./action-type.interface";
import MapFactory from "./utils/mockMaps";

describe('RouteService', () => {
  let service: RouteService;
  let mapFactory: MapFactory;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [RouteService] });
    service = TestBed.inject(RouteService);
    mapFactory = new MapFactory();
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

  // TODO write more route tests
  describe('route', () => {
    it('correctly stores movements in route', () => {
      const [loc1, loc2, loc3] = service.map = mapFactory.threeEmptyLocations();
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
      const [loc1, loc2, loc3, loc4] = service.map = mapFactory.invalidRoutes();
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

  describe('unlocking', () => {
    it('accesses unlocked objects', () => {
      const [loc1, loc2] = service.map = mapFactory.twoEmptyLocations();
      service.currentLocation = service.getLocationAtIndex(0);
      service.moveTo(1);
      expect(service.getCurrentLocation()).toEqual(loc2);
    });

    it('refuses to access locked objects', () => {
      const [loc1, loc2] = service.map = mapFactory.singleLockedLocations();
      service.currentLocation = service.getLocationAtIndex(0);
      service.moveTo(1);
      expect(service.getCurrentLocation()).toEqual(loc1);
    });

    it('correctly unlocks objects once their dependency has been resolved', () => {
      const [loc1, loc2] = service.map = mapFactory.singleLockedLocations();
      service.currentLocation = service.getLocationAtIndex(0);
      service.kill(0)
      service.moveTo(1);
      expect(service.getCurrentLocation()).toEqual(loc2);
    });

    it('correctly unlocks softlocked objects when any of their dependencies get resolved', () => {
      const [loc1, loc2] = service.map = mapFactory.softLockedLocations();
      service.currentLocation = service.getLocationAtIndex(0);
      service.kill(1)
      service.moveTo(1);
      expect(service.getCurrentLocation()).toEqual(loc2);
    });

    it('does not unlock hardlocked objects when only part of their dependencies get resolved', () => {
      const [loc1, loc2] = service.map = mapFactory.hardLockedLocations();
      service.currentLocation = service.getLocationAtIndex(0);
      service.kill(1)
      service.moveTo(1);
      expect(service.getCurrentLocation()).toEqual(loc1);
    });

    it('unlocks hardlocked ojects if all their dependencies are resolved', () => {
      const [loc1, loc2] = service.map = mapFactory.hardLockedLocations();
      service.currentLocation = service.getLocationAtIndex(0);
      service.kill(0)
      service.kill(1)
      service.moveTo(1);
      expect(service.getCurrentLocation()).toEqual(loc2);
    });

    // TODO test areaswheredependenciesgotmodified
  });
});
