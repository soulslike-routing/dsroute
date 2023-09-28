import { TestBed } from '@angular/core/testing';
import { RouteService } from './route.service';
import {ActionType} from "./action-type.interface";
import MapFactory from "./utils/mockMaps";
import {last} from "./utils/arrayHelpers";

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

  describe('map content', () => {
      it('starts at location Northern Undead Asylum', () => {
          expect(service.getCurrentLocation()).toBe(service.mapService.getMap()[0]);
          expect(service.getCurrentLocation().name).toEqual("Northern Undead Asylum");
      });
  });

  describe('route', () => {
      it('starts with empty route', () => {
          expect(service.getRoute().length).toBe(0);
      });

    it('correctly stores movements in route', () => {
      service.mapService.map = mapFactory.threeEmptyLocations();
      service.currentLocation = service.mapService.getLocationAtIndex(0);

      expect(service.getRoute().length).toBe(0);

      service.moveTo(1);
      expect(service.getRoute().length).toBe(1);
      expect(service.getRoute()).toEqual([
        {type: ActionType.GOTO, target: 1, dependenciesRemovedFrom: [], origin: 0}
      ]);

      service.moveTo(0);
      expect(service.getRoute().length).toBe(2);
      expect(service.getRoute()).toEqual([
        {type: ActionType.GOTO, target: 1, dependenciesRemovedFrom: [], origin: 0},
        {type: ActionType.GOTO, target: 0, dependenciesRemovedFrom: [], origin: 1}
      ]);

      service.moveTo(1);
      service.moveTo(2);
      expect(service.getRoute().length).toBe(4);
      expect(service.getRoute()).toEqual([
        {type: ActionType.GOTO, target: 1, dependenciesRemovedFrom: [], origin: 0},
        {type: ActionType.GOTO, target: 0, dependenciesRemovedFrom: [], origin: 1},
        {type: ActionType.GOTO, target: 1, dependenciesRemovedFrom: [], origin: 0},
        {type: ActionType.GOTO, target: 2, dependenciesRemovedFrom: [], origin: 1}
      ]);
    });

    it('refuses to store invalid moves in route', () => {
      service.mapService.map = mapFactory.invalidRoutes();
      service.currentLocation = service.mapService.getLocationAtIndex(0);

      expect(service.getRoute().length).toBe(0);

      service.moveTo(1);
      service.moveTo(2);
      service.moveTo(3);
      expect(service.getRoute().length).toBe(2);
      expect(service.getRoute()).toEqual([
        {type: ActionType.GOTO, target: 1, dependenciesRemovedFrom: [], origin: 0},
        {type: ActionType.GOTO, target: 2, dependenciesRemovedFrom: [], origin: 1}
      ]);
    });
  });

  describe('unlocking', () => {
    describe('dependencies', () => {
      it('correctly removes single dependencies', () => {
        service.mapService.map = mapFactory.unlockByEnemy();
        service.currentLocation = service.mapService.getLocationAtIndex(0);
        expect(service.mapService.getLocationAtIndex(1).dependencies).toEqual({ "locations": [], "enemies": [0], "items": [], "hard_locked": false });
        service.kill(0);
        expect(service.mapService.getLocationAtIndex(1).dependencies).toEqual({ "locations": [], "enemies": [], "items": [], "hard_locked": false });
      });

      it('removes all dependencies on softlocked object after single one got resolved', () => {
        service.mapService.map = mapFactory.stackingSoftlocksEnemies();
        service.currentLocation = service.mapService.getLocationAtIndex(0);
        expect(service.mapService.getLocationAtIndex(1).dependencies).toEqual({ "locations": [], "enemies": [0, 1], "items": [], "hard_locked": false });
        service.kill(1);
        expect(service.mapService.getLocationAtIndex(1).dependencies).toEqual({ "locations": [], "enemies": [], "items": [], "hard_locked": false });
      });

      it('needs explicit actions to remove each hardlocked dependency', () => {
        service.mapService.map = mapFactory.hardLockedLocationByEnemies();
        service.currentLocation = service.mapService.getLocationAtIndex(0);
        expect(service.mapService.getLocationAtIndex(1).dependencies).toEqual({ "locations": [], "enemies": [0, 1], "items": [], "hard_locked": true });
        service.kill(0);
        expect(service.mapService.getLocationAtIndex(1).dependencies).toEqual({ "locations": [], "enemies": [1], "items": [], "hard_locked": true });
        service.kill(1);
        expect(service.mapService.getLocationAtIndex(1).dependencies).toEqual({ "locations": [], "enemies": [], "items": [], "hard_locked": true });
      });
    });

    describe('access', () => {
      it('accesses unlocked objects', () => {
        const [, loc1] = service.mapService.map = mapFactory.twoEmptyLocations();
        service.currentLocation = service.mapService.getLocationAtIndex(0);
        service.moveTo(1);
        expect(service.getCurrentLocation()).toEqual(loc1);
      });

      it('refuses to access locked objects', () => {
        const [loc0,] = service.mapService.map = mapFactory.unlockByEnemy();
        service.currentLocation = service.mapService.getLocationAtIndex(0);
        service.moveTo(1);
        expect(service.getCurrentLocation()).toEqual(loc0);
      });

      it('correctly unlocks objects once their dependency has been resolved', () => {
        const [, loc1] = service.mapService.map = mapFactory.unlockByEnemy();
        service.currentLocation = service.mapService.getLocationAtIndex(0);
        service.kill(0)
        service.moveTo(1);
        expect(service.getCurrentLocation()).toEqual(loc1);
      });

      it('correctly unlocks softlocked objects when any of their dependencies get resolved', () => {
        const [, loc1] = service.mapService.map = mapFactory.stackingSoftlocksEnemies();
        service.currentLocation = service.mapService.getLocationAtIndex(0);
        service.kill(1)
        service.moveTo(1);
        expect(service.getCurrentLocation()).toEqual(loc1);
      });

      it('does not unlock hardlocked objects when only part of their dependencies get resolved', () => {
        const [loc0,] = service.mapService.map = mapFactory.hardLockedLocationByEnemies();
        service.currentLocation = service.mapService.getLocationAtIndex(0);
        service.kill(1)
        service.moveTo(1);
        expect(service.getCurrentLocation()).toEqual(loc0);
      });

      it('unlocks hardlocked objects if all their dependencies are resolved', () => {
        const [, loc1] = service.mapService.map = mapFactory.hardLockedLocationByEnemies();
        service.currentLocation = service.mapService.getLocationAtIndex(0);
        service.kill(0)
        service.kill(1)
        service.moveTo(1);
        expect(service.getCurrentLocation()).toEqual(loc1);
      });
    });

    describe('areas where dependencies got modified', () => {
      it('moving to area without unlocks does not affect anything', () => {
        service.mapService.map = mapFactory.twoEmptyLocations();
        service.currentLocation = service.mapService.getLocationAtIndex(0);
        service.moveTo(1);
        expect(service.getRoute()).toEqual([
          {type: ActionType.GOTO, target: 1, dependenciesRemovedFrom: [], origin: 0}
        ]);
      });

      it('collecting items without unlocks does not affect anything', () => {
        service.mapService.map = mapFactory.basicItem();
        service.currentLocation = service.mapService.getLocationAtIndex(0);
        service.collect(0);
        expect(service.getRoute()).toEqual([
          {type: ActionType.PICKUP, target: 0, dependenciesRemovedFrom: [], origin: 0}
        ]);
      });

      it('killing enemies without unlocks does not affect anything', () => {
        service.mapService.map = mapFactory.basicEnemy();
        service.currentLocation = service.mapService.getLocationAtIndex(0);
        service.kill(0);
        expect(service.getRoute()).toEqual([
          {type: ActionType.KILL, target: 0, dependenciesRemovedFrom: [], origin: 0}
        ]);
      });

      it('moving to area with unlock returns that as affected', () => {
        service.mapService.map = mapFactory.unlockByMovement();
        service.currentLocation = service.mapService.getLocationAtIndex(0);
        service.moveTo(1);
        expect(service.getRoute()).toEqual([
          {type: ActionType.GOTO, target: 1, dependenciesRemovedFrom: [2], origin: 0}
        ]);
      });

      it('collecting item with unlock returns that as affected', () => {
        service.mapService.map = mapFactory.unlockByItem();
        service.currentLocation = service.mapService.getLocationAtIndex(0);
        service.collect(0);
        expect(service.getRoute()).toEqual([
          {type: ActionType.PICKUP, target: 0, dependenciesRemovedFrom: [1], origin: 0}
        ]);
      });

      it('killing enemy with unlock returns that as affected', () => {
        service.mapService.map = mapFactory.unlockByEnemy();
        service.currentLocation = service.mapService.getLocationAtIndex(0);
        service.kill(0);
        expect(service.getRoute()).toEqual([
          {type: ActionType.KILL, target: 0, dependenciesRemovedFrom: [1], origin: 0}
        ]);
      });

      it('moving to area with unlock previously done by other softlock doesnt affect anything', () => {
        service.mapService.map = mapFactory.stackingSoftlocksLocation();
        service.currentLocation = service.mapService.getLocationAtIndex(0);
        service.moveTo(1);
        expect(service.getRoute()).toEqual([
          {type: ActionType.GOTO, target: 1, dependenciesRemovedFrom: [3], origin: 0}
        ]);
        service.moveTo(2);
        expect(service.getRoute()).toEqual([
          {type: ActionType.GOTO, target: 1, dependenciesRemovedFrom: [3], origin: 0},
          {type: ActionType.GOTO, target: 2, dependenciesRemovedFrom: [], origin: 1}
        ]);
      });

      it('collecting item with unlock previously done by other softlock doesnt affect anything', () => {
        service.mapService.map = mapFactory.stackingSoftlocksItem();
        service.currentLocation = service.mapService.getLocationAtIndex(0);
        service.collect(0);
        expect(service.getRoute()).toEqual([
          {type: ActionType.PICKUP, target: 0, dependenciesRemovedFrom: [1], origin: 0}
        ]);
        service.collect(1);
        expect(service.getRoute()).toEqual([
          {type: ActionType.PICKUP, target: 0, dependenciesRemovedFrom: [1], origin: 0},
          {type: ActionType.PICKUP, target: 1, dependenciesRemovedFrom: [], origin: 0}
        ]);
      });

      it('killing enemy with unlock previously done by other softlock doesnt affect anything', () => {
        service.mapService.map = mapFactory.stackingSoftlocksEnemies();
        service.currentLocation = service.mapService.getLocationAtIndex(0);
        service.kill(0);
        expect(service.getRoute()).toEqual([
          {type: ActionType.KILL, target: 0, dependenciesRemovedFrom: [1], origin: 0}
        ]);
        service.kill(1);
        expect(service.getRoute()).toEqual([
          {type: ActionType.KILL, target: 0, dependenciesRemovedFrom: [1], origin: 0},
          {type: ActionType.KILL, target: 1, dependenciesRemovedFrom: [], origin: 0}
        ]);
      });

      it('moving to area with unlock previously done by other hardlock does affect something', () => {
        service.mapService.map = mapFactory.hardLockedLocationByLocations();
        service.currentLocation = service.mapService.getLocationAtIndex(0);
        service.moveTo(1);
        expect(service.getRoute()).toEqual([
          {type: ActionType.GOTO, target: 1, dependenciesRemovedFrom: [3], origin: 0}
        ]);
        service.moveTo(2);
        expect(service.getRoute()).toEqual([
          {type: ActionType.GOTO, target: 1, dependenciesRemovedFrom: [3], origin: 0},
          {type: ActionType.GOTO, target: 2, dependenciesRemovedFrom: [3], origin: 1}
        ]);
      });

      it('collecting item with unlock previously done by other hardlock doesnt affect something', () => {
        service.mapService.map = mapFactory.hardLockedLocationByItems();
        service.currentLocation = service.mapService.getLocationAtIndex(0);
        service.collect(0);
        expect(service.getRoute()).toEqual([
          {type: ActionType.PICKUP, target: 0, dependenciesRemovedFrom: [1], origin: 0}
        ]);
        service.collect(1);
        expect(service.getRoute()).toEqual([
          {type: ActionType.PICKUP, target: 0, dependenciesRemovedFrom: [1], origin: 0},
          {type: ActionType.PICKUP, target: 1, dependenciesRemovedFrom: [1], origin: 0}
        ]);
      });

      it('killing enemy with unlock previously done by other hardlock doesnt affect something', () => {
        service.mapService.map = mapFactory.hardLockedLocationByEnemies();
        service.currentLocation = service.mapService.getLocationAtIndex(0);
        service.kill(0);
        expect(service.getRoute()).toEqual([
          {type: ActionType.KILL, target: 0, dependenciesRemovedFrom: [1], origin: 0}
        ]);
        service.kill(1);
        expect(service.getRoute()).toEqual([
          {type: ActionType.KILL, target: 0, dependenciesRemovedFrom: [1], origin: 0},
          {type: ActionType.KILL, target: 1, dependenciesRemovedFrom: [1], origin: 0}
        ]);
      });
    });
  });

  describe('undo', () => {
    it('undoes simple movement without unlocks or dependencies', () => {
      const [loc0, loc1] = service.mapService.map = mapFactory.twoEmptyLocations();
      service.currentLocation = service.mapService.getLocationAtIndex(0);

      service.moveTo(1);
      expect(service.getCurrentLocation()).toEqual(loc1);
      expect(service.getRoute().length).toBe(1);
      expect(service.getRoute()).toEqual([
        {type: ActionType.GOTO, target: 1, dependenciesRemovedFrom: [], origin: 0}
      ]);

      service.undoAction(last(service.getRoute()));
      expect(service.getCurrentLocation()).toEqual(loc0);
      expect(service.getRoute().length).toBe(0);
      expect(service.getRoute()).toEqual([]);
    });

    it('undoes simple collection without unlocks or dependencies', () => {
      service.mapService.map = mapFactory.basicItem();
      service.currentLocation = service.mapService.getLocationAtIndex(0);

      service.collect(0);
      expect(service.getCurrentLocation().items[0].collected).toBeTrue();
      expect(service.getRoute().length).toBe(1);
      expect(service.getRoute()).toEqual([
        {type: ActionType.PICKUP, target: 0, dependenciesRemovedFrom: [], origin: 0}
      ]);

      service.undoAction(last(service.getRoute()));
      expect(service.getCurrentLocation().items[0].collected).toBeFalse();
      expect(service.getRoute().length).toBe(0);
      expect(service.getRoute()).toEqual([]);
    });

    it('undoes simple kill without unlocks or dependencies', () => {
      service.mapService.map = mapFactory.basicEnemy();
      service.currentLocation = service.mapService.getLocationAtIndex(0);

      service.kill(0);
      expect(service.getCurrentLocation().enemies[0].killed).toBeTrue();
      expect(service.getRoute().length).toBe(1);
      expect(service.getRoute()).toEqual([
        {type: ActionType.KILL, target: 0, dependenciesRemovedFrom: [], origin: 0}
      ]);

      service.undoAction(last(service.getRoute()));
      expect(service.getCurrentLocation().enemies[0].killed).toBeFalse();
      expect(service.getRoute().length).toBe(0);
      expect(service.getRoute()).toEqual([]);
    });

    it('undoes movement that unlocked area and re-locks that area', () => {
      const [loc0, loc1,] = service.mapService.map = mapFactory.unlockByMovement();
      service.currentLocation = service.mapService.getLocationAtIndex(0);

      service.moveTo(1);
      expect(service.getCurrentLocation()).toEqual(loc1);
      expect(service.mapService.getLocationAtIndex(2).dependencies.locations.length).toBe(0);
      expect(service.mapService.getLocationAtIndex(2).dependencies.locations).toEqual([]);
      expect(service.getRoute().length).toBe(1);
      expect(service.getRoute()).toEqual([
        {type: ActionType.GOTO, target: 1, dependenciesRemovedFrom: [2], origin: 0}
      ]);

      service.undoAction(last(service.getRoute()));
      expect(service.getCurrentLocation()).toEqual(loc0);
      expect(service.mapService.getLocationAtIndex(2).dependencies.locations.length).toBe(1);
      expect(service.mapService.getLocationAtIndex(2).dependencies.locations).toEqual([1]);
      expect(service.getRoute().length).toBe(0);
      expect(service.getRoute()).toEqual([]);
    });

    it('undoes collection that unlocked area and re-locks that area', () => {
      service.mapService.map = mapFactory.unlockByItem();
      service.currentLocation = service.mapService.getLocationAtIndex(0);

      service.collect(0);
      expect(service.getCurrentLocation().items[0].collected).toBeTrue();
      expect(service.mapService.getLocationAtIndex(1).dependencies.items.length).toBe(0);
      expect(service.mapService.getLocationAtIndex(1).dependencies.items).toEqual([]);
      expect(service.getRoute().length).toBe(1);
      expect(service.getRoute()).toEqual([
        {type: ActionType.PICKUP, target: 0, dependenciesRemovedFrom: [1], origin: 0}
      ]);

      service.undoAction(last(service.getRoute()));
      expect(service.getCurrentLocation().items[0].collected).toBeFalse();
      expect(service.mapService.getLocationAtIndex(1).dependencies.items.length).toBe(1);
      expect(service.mapService.getLocationAtIndex(1).dependencies.items).toEqual([0]);
      expect(service.getRoute().length).toBe(0);
      expect(service.getRoute()).toEqual([]);
    });

    it('undoes kill that unlocked area and re-locks that area', () => {
      service.mapService.map = mapFactory.unlockByEnemy();
      service.currentLocation = service.mapService.getLocationAtIndex(0);

      service.kill(0);
      expect(service.getCurrentLocation().enemies[0].killed).toBeTrue();
      expect(service.mapService.getLocationAtIndex(1).dependencies.enemies.length).toBe(0);
      expect(service.mapService.getLocationAtIndex(1).dependencies.enemies).toEqual([]);
      expect(service.getRoute().length).toBe(1);
      expect(service.getRoute()).toEqual([
        {type: ActionType.KILL, target: 0, dependenciesRemovedFrom: [1], origin: 0}
      ]);

      service.undoAction(last(service.getRoute()));
      expect(service.getCurrentLocation().enemies[0].killed).toBeFalse();
      expect(service.mapService.getLocationAtIndex(1).dependencies.enemies.length).toBe(1);
      expect(service.mapService.getLocationAtIndex(1).dependencies.enemies).toEqual([0]);
      expect(service.getRoute().length).toBe(0);
      expect(service.getRoute()).toEqual([]);
    });

    it('undoes repeated unlocking movement without re-locking', () => {
      const [loc0, loc1,] = service.mapService.map = mapFactory.unlockByMovement();
      service.currentLocation = service.mapService.getLocationAtIndex(0);

      service.moveTo(1);
      service.moveTo(0);
      service.moveTo(1);
      expect(service.getCurrentLocation()).toEqual(loc1);
      expect(service.mapService.getLocationAtIndex(2).dependencies.locations.length).toBe(0);
      expect(service.mapService.getLocationAtIndex(2).dependencies.locations).toEqual([]);
      expect(service.getRoute().length).toBe(3);
      expect(service.getRoute()).toEqual([
        {type: ActionType.GOTO, target: 1, dependenciesRemovedFrom: [2], origin: 0},
        {type: ActionType.GOTO, target: 0, dependenciesRemovedFrom: [], origin: 1},
        {type: ActionType.GOTO, target: 1, dependenciesRemovedFrom: [], origin: 0},
      ]);

      service.undoAction(last(service.getRoute()));
      expect(service.getCurrentLocation()).toEqual(loc0);
      expect(service.mapService.getLocationAtIndex(2).dependencies.locations.length).toBe(0);
      expect(service.mapService.getLocationAtIndex(2).dependencies.locations).toEqual([]);
      expect(service.getRoute().length).toBe(2);
      expect(service.getRoute()).toEqual([
        {type: ActionType.GOTO, target: 1, dependenciesRemovedFrom: [2], origin: 0},
        {type: ActionType.GOTO, target: 0, dependenciesRemovedFrom: [], origin: 1},
      ]);
    });

    /* Clarify if this is even possible. Because, that would mean there are respawning items / enemies that
      unlock something the first time they are interacted with...
    it('undoes repeated unlocking collection without re-locking', () => {});

    it('undoes repeated unlocking kill without re-locking', () => {});
     */

    it('undoes repeated unlocking movement multiple times, re-locking', () => {
      const [loc0,,] = service.mapService.map = mapFactory.unlockByMovement();
      service.currentLocation = service.mapService.getLocationAtIndex(0);

      service.moveTo(1);
      service.moveTo(0);
      service.moveTo(1);

      service.undoAction(last(service.getRoute()));
      service.undoAction(last(service.getRoute()));
      service.undoAction(last(service.getRoute()));
      expect(service.getCurrentLocation()).toEqual(loc0);
      expect(service.mapService.getLocationAtIndex(2).dependencies.locations.length).toBe(1);
      expect(service.mapService.getLocationAtIndex(2).dependencies.locations).toEqual([1]);
      expect(service.getRoute().length).toBe(0);
      expect(service.getRoute()).toEqual([]);
    });

    /* Same as above
    it('undoes repeated unlocking collection multiple times, re-locking', () => {});

    it('undoes repeated unlocking kill multiple times, re-locking', () => {});
    */
  });
});
