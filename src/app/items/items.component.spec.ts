import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ItemsComponent } from './items.component';
import { NiceButtonComponent } from '../nice-button/nice-button.component';

describe('ItemsComponent', () => {
  let component: ItemsComponent;
  let fixture: ComponentFixture<ItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemsComponent,NiceButtonComponent ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemsComponent);
    component = fixture.componentInstance;
    component.possibleItems = [
      {"id": 1, "name": "i1", "collected": false, "count":  1, "unlocks": []},
      {"id": 2, "name": "i2", "collected": true, "count":  5, "unlocks": [10, 11]}
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not display container without items', () => {
    component.possibleItems = [];
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.button-container-container'))).toBeNull();
  });

  it('should display correct text when items are missing', () => {
    component.possibleItems = [];
    fixture.detectChanges();
    const itemsElement: HTMLElement = fixture.nativeElement;
    const h4 = itemsElement.querySelector('h4')!;
    expect(h4.textContent).toEqual("You don't have any items to collect here");
  });

  it('should display correct amount of buttons', () => {
    const itemsDebug: DebugElement = fixture.debugElement;
    const buttons = itemsDebug.queryAll(By.css('dsr-nice-button'));
    expect(buttons.length).toEqual(component.possibleItems.length);
  });

  it('should pass the correct objects down to the buttons', () => {
    const itemsDebug: DebugElement = fixture.debugElement;
    const buttons = itemsDebug.queryAll(By.directive(NiceButtonComponent));
    expect(buttons[0].componentInstance.displayable).toEqual({"id": 1, "name": "i1", "collected": false, "count":  1, "unlocks": []});
    expect(buttons[1].componentInstance.displayable).toEqual({"id": 2, "name": "i2", "collected": true, "count":  5, "unlocks": [10, 11]});
  });

  it('should emit an event when collect is called', () => {
    spyOn(component.stateChanged, 'emit');
    console.log = () => {};
    component.collect(1);
    expect(component.stateChanged.emit).toHaveBeenCalled();
  });

});
