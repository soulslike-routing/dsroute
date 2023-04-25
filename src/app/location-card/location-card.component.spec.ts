import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationCardComponent } from './location-card.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('LocationCardComponent', () => {
  let component: LocationCardComponent;
  let fixture: ComponentFixture<LocationCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        LocationCardComponent
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
