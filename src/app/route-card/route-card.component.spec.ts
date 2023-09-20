import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, Injectable, ChangeDetectorRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RouteCardComponent } from './route-card.component';
import {PlayerAction} from "../player-action.interface";
import {RouteService} from "../route.service";
import { ActionType } from "../action-type.interface";
import {Location} from "../location.interface";
import locations from '../../assets/locations.json'
import items from '../../assets/items.json'
import enemies from '../../assets/enemies.json'

describe('RouteCardComponent', () => {
  let component: RouteCardComponent;
  let fixture: ComponentFixture<RouteCardComponent>;
  let routeService: RouteService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RouteCardComponent ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      providers: [
        RouteCardComponent,
        ChangeDetectorRef,
        { provide: RouteService, useClass: MockRouteService },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouteCardComponent);
    component = TestBed.inject(RouteCardComponent);
    routeService = TestBed.inject(RouteService);

    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('creates', () => {
    expect(component).toBeTruthy();
  });

  it("starts without any list items", () => {
    expect(component.playerActions.length).toEqual(0);
    expect(fixture.debugElement.queryAll(By.css('li')).length).toEqual(0);
  });

  it("adds 1 list item per entry in route", () => {
    component.playerActions = [
      {type: ActionType.GOTO, target: 1, dependenciesRemovedFrom: []}
    ];
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('li')).length).toEqual(1);

    component.playerActions = [
      {type: ActionType.GOTO, target: 1, dependenciesRemovedFrom: []},
      {type: ActionType.GOTO, target: 0, dependenciesRemovedFrom: []}
    ];
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('li')).length).toEqual(2);

    component.playerActions = [
      {type: ActionType.GOTO, target: 1, dependenciesRemovedFrom: []},
      {type: ActionType.GOTO, target: 2, dependenciesRemovedFrom: []},
      {type: ActionType.GOTO, target: 1, dependenciesRemovedFrom: []}
    ];
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('li')).length).toEqual(3);
  });

  it("properly looks up action target names", () => {
    component.locations = {
      "0": "location0",
      "1": "location1"
    };
    expect(component.lookupName({type: ActionType.GOTO, target: 1, dependenciesRemovedFrom: []})).toEqual("location1");
    component.items = {
      "0": "item0",
    };
    expect(component.lookupName({type: ActionType.PICKUP, target: 0, dependenciesRemovedFrom: []})).toEqual("item0");
    component.enemies = {
      "0": "enemy0",
    };
    expect(component.lookupName({type: ActionType.KILL, target: 0, dependenciesRemovedFrom: []})).toEqual("enemy0");
  });

  it("displays correct action name as figcaption using lookup", () => {
    component.locations = {
      "0": "my_epic_locationname",
      "1": "my_second_location",
      "2": "my_third_location"
    };
    component.playerActions = [
      {type: ActionType.GOTO, target: 1, dependenciesRemovedFrom: []}
    ];
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('figcaption'))[0].nativeElement.textContent).toEqual("my_second_location");

    component.items = {
      "0": "my_epic_itemname"
    };
    component.playerActions = [
      {type: ActionType.GOTO, target: 1, dependenciesRemovedFrom: []},
      {type: ActionType.PICKUP, target: 0, dependenciesRemovedFrom: []}
    ];
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('figcaption'))[0].nativeElement.textContent).toEqual("my_epic_itemname");

    component.enemies = {
      "0": "my_epic_enemyname"
    };
    component.playerActions = [
      {type: ActionType.GOTO, target: 1, dependenciesRemovedFrom: []},
      {type: ActionType.PICKUP, target: 0, dependenciesRemovedFrom: []},
      {type: ActionType.GOTO, target: 2, dependenciesRemovedFrom: []},
      {type: ActionType.KILL, target: 0, dependenciesRemovedFrom: []},
    ];
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('figcaption'))[0].nativeElement.textContent).toEqual("my_epic_enemyname");
  });

  it("displays correct indicator emoji", () => {
     component.locations = {
      "0": "my_epic_locationname",
      "1": "my_second_location",
      "2": "my_third_location"
    };
    component.playerActions = [
      {type: ActionType.GOTO, target: 1, dependenciesRemovedFrom: []}
    ];
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('.indicator'))[0].nativeElement.textContent).toEqual("🏃‍♀️");

    component.items = {
      "0": "my_epic_itemname"
    };
    component.playerActions = [
      {type: ActionType.GOTO, target: 1, dependenciesRemovedFrom: []},
      {type: ActionType.PICKUP, target: 0, dependenciesRemovedFrom: []}
    ];
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('.indicator'))[0].nativeElement.textContent).toEqual("🖐️");

    component.enemies = {
      "0": "my_epic_enemyname"
    };
    component.playerActions = [
      {type: ActionType.GOTO, target: 1, dependenciesRemovedFrom: []},
      {type: ActionType.PICKUP, target: 0, dependenciesRemovedFrom: []},
      {type: ActionType.GOTO, target: 2, dependenciesRemovedFrom: []},
      {type: ActionType.KILL, target: 0, dependenciesRemovedFrom: []},
    ];
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('.indicator'))[0].nativeElement.textContent).toEqual("⚔️");
  });
});

@Injectable()
class MockRouteService extends RouteService{
  override currentLocation: Location = {
    "id": 0,
    "name": "my_epic_locationname",
    "connections": [1],
    "dependencies": {"locations": [], "enemies": [], "items": [], "hard_locked": false},
    "unlocks": [],
    "items": [],
    "enemies": []
  };

  override map: Location[] = [{
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
      "items": [{"id": 0, "name": "my_epic_itemname", "collected": false, "count":  1, "unlocks": []}],
      "enemies": []
    },
    {
      "id": 2,
      "name": "my_third_location",
      "connections": [1],
      "dependencies": {"locations": [], "enemies": [], "items": [], "hard_locked": false},
      "unlocks": [],
      "items": [],
      "enemies": [{"id": 0, "name": "my_epic_enemyname", "unlocks": [], "killed": false, "respawns": false}]
    }];
}
