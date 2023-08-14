import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditActionModalComponent } from './edit-action-modal.component';

describe('EditActionModalComponent', () => {
  let component: EditActionModalComponent;
  let fixture: ComponentFixture<EditActionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditActionModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditActionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
