import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, Injectable, ChangeDetectorRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RouteCardComponent } from './route-card.component';
import {PlayerAction} from "../player-action.interface";
import {RouteService} from "../route.service";
import { ActionType } from "../action-type.interface";
import {Location} from "../location.interface";

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
        { provide: RouteService, useClass: MockRouteService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouteCardComponent);
    component = TestBed.inject(RouteCardComponent);
    routeService = TestBed.inject(RouteService);

    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should start without any list items", () => {
    expect(fixture.debugElement.queryAll(By.css('li')).length).toEqual(0);
  });

  it("should add 1 list item per entry in route", () => {
    component.playerActions = [{type: ActionType.GOTO, target: 1}];
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('li')).length).toEqual(1);
    component.playerActions = [{type: ActionType.GOTO, target: 1}, {type: ActionType.GOTO, target: 0}];
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('li')).length).toEqual(2);
    component.playerActions = [{type: ActionType.GOTO, target: 1}, {type: ActionType.GOTO, target: 2}, {type: ActionType.GOTO, target: 1}];
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('li')).length).toEqual(3);
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
}
