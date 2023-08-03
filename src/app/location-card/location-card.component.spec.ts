import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocationCardComponent } from './location-card.component';
import { CUSTOM_ELEMENTS_SCHEMA, Injectable, ChangeDetectorRef } from '@angular/core';
import {RouteService} from "../route.service";
import { Location } from '../location.interface';

describe('LocationCardComponent', () => {
  let component: LocationCardComponent;
  let fixture: ComponentFixture<LocationCardComponent>;
  let routeService: RouteService;

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

    fixture = TestBed.createComponent(LocationCardComponent);
    component = TestBed.inject(LocationCardComponent);
    routeService = TestBed.inject(RouteService);

    component = fixture.componentInstance;
    component.location =   {
      "id": 0,
      "name": "my_epic_locationname",
      "connections": [1],
      "dependencies": {"locations": [], "enemies": [], "items": [], "hard_locked": false},
      "unlocks": [],
      "items": [],
      "enemies": []
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display matching title', () => {
    const locationCardElement: HTMLElement = fixture.nativeElement;
    const h1 = locationCardElement.querySelector('h1')!;
    expect(h1.textContent).toEqual('Currently at: my_epic_locationname');
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
}
