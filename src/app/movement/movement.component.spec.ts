import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MovementComponent } from './movement.component';
import { NiceButtonComponent } from '../nice-button/nice-button.component';

describe('MovementComponent', () => {
  let component: MovementComponent;
  let fixture: ComponentFixture<MovementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovementComponent, NiceButtonComponent ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovementComponent);
    component = fixture.componentInstance;
    component.possibleMovements = [
  {
    "id": 0,
    "name": "l0",
    "connections": [1],
    "dependencies": {"locations": [], "enemies": [], "items": [], "hard_locked": false},
    "unlocks": [],
    "items": [],
    "enemies": []
  },
  {
    "id": 1,
    "name": "l1",
    "connections": [0],
    "dependencies": {"locations": [0], "enemies": [], "items": [0], "hard_locked": false},
    "unlocks": [],
    "items": [],
    "enemies": []
  }
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not display container without locations', () => {
    component.possibleMovements = [];
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.button-container-container'))).toBeNull();
  });

  it('should display correct text when locations are missing', () => {
    component.possibleMovements = [];
    fixture.detectChanges();
    const itemsElement: HTMLElement = fixture.nativeElement;
    const h4 = itemsElement.querySelector('h4')!;
    expect(h4.textContent).toEqual("You don't have any movement options atm");
  });

  it('should display correct amount of buttons', () => {
    const locationsDebug: DebugElement = fixture.debugElement;
    const buttons = locationsDebug.queryAll(By.css('dsr-nice-button'));
    expect(buttons.length).toEqual(component.possibleMovements.length);
  });

  it('should pass the correct objects down to the buttons', () => {
    const locationsDebug: DebugElement = fixture.debugElement;
    const buttons = locationsDebug.queryAll(By.directive(NiceButtonComponent));
    expect(buttons[0].componentInstance.displayable).toEqual({
    "id": 0,
    "name": "l0",
    "connections": [1],
    "dependencies": {"locations": [], "enemies": [], "items": [], "hard_locked": false},
    "unlocks": [],
    "items": [],
    "enemies": []
  });
    expect(buttons[1].componentInstance.displayable).toEqual(  {
    "id": 1,
    "name": "l1",
    "connections": [0],
    "dependencies": {"locations": [0], "enemies": [], "items": [0], "hard_locked": false},
    "unlocks": [],
    "items": [],
    "enemies": []
  });
  });

  it('should emit an event when collect is called', () => {
    spyOn(component.stateChanged, 'emit');
    component.moveTo(1);
    expect(component.stateChanged.emit).toHaveBeenCalled();
  });
});
