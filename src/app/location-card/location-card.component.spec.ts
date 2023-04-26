import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocationCardComponent } from './location-card.component';
import { CUSTOM_ELEMENTS_SCHEMA, Injectable, ChangeDetectorRef } from '@angular/core';
import {RouteService} from "../route.service";
import { Location } from '../location';

describe('LocationCardComponent', () => {
  let component: LocationCardComponent;
  let routeService: RouteService;
  let fixture: ComponentFixture<LocationCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        LocationCardComponent
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      providers: [
        LocationCardComponent,
        ChangeDetectorRef,
        { provide: RouteService, useClass: MockRouteService }
      ]
    })
    .compileComponents();

    component = TestBed.inject(LocationCardComponent);
    routeService = TestBed.inject(RouteService);
    TestBed.inject(ChangeDetectorRef);

    fixture = TestBed.createComponent(LocationCardComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
    component.location =   {
    "id": 0,
    "name": "my_epic_locationname",
    "connections": [1],
    "dependencies": {"locations": [], "enemies": [], "items": [], "hard_locked": false},
    "unlocks": [],
    "items": [],
    "enemies": []
  };
    component.onStateChange();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display matching title', () => {
    const locationCardElement: HTMLElement = fixture.nativeElement;
    const h1 = locationCardElement.querySelector('h1')!;
    expect(h1.textContent).toEqual('Currently at: my_epic_locationname');
  });

  it('should switch title after moving', () => {
    routeService.moveTo(1);
    component.onStateChange();
    fixture.detectChanges();
    const locationCardElement: HTMLElement = fixture.nativeElement;
    const h1 = locationCardElement.querySelector('h1')!;
    expect(h1.textContent).toEqual('Currently at: second_loc');
  });
});

@Injectable({
  providedIn: 'root'
})
class MockRouteService extends RouteService{
  override map: Location[] = [{
    "id": 0,
    "name": "my_epic_locationname",
    "connections": [1],
    "dependencies": {"locations": [], "enemies": [], "items": [], "hard_locked": false},
    "unlocks": [],
    "items": [],
    "enemies": []
  },{
    "id": 1,
    "name": "second_loc",
    "connections": [0],
    "dependencies": {"locations": [], "enemies": [], "items": [], "hard_locked": false},
    "unlocks": [],
    "items": [],
    "enemies": []
  }];

  override currentLocation: Location = {
    "id": 0,
    "name": "my_epic_locationname",
    "connections": [1],
    "dependencies": {"locations": [], "enemies": [], "items": [], "hard_locked": false},
    "unlocks": [],
    "items": [],
    "enemies": []
  };
}
