import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NiceButtonComponent } from './nice-button.component';

describe('NiceButtonComponent', () => {
  let component: NiceButtonComponent;
  let fixture: ComponentFixture<NiceButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NiceButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NiceButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
