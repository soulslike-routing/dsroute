import { ComponentFixture, TestBed } from '@angular/core/testing';
import {EventEmitter} from '@angular/core';
import { NiceButtonComponent } from './nice-button.component';
import { By } from '@angular/platform-browser';

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
    component.displayable = {"id": -1, "name":"testname"};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should store displayable properly', () => {
    expect(component.displayable).toEqual({"id":-1, "name":"testname"});
  });

  it('should have button with "testname"', () => {
    const niceButtonElement: HTMLElement = fixture.nativeElement;
    const button = niceButtonElement.querySelector('button')!;
    expect(button.textContent).toEqual('testname');
  });

  it('should not display icon by default', () => {
    const niceButtonElement: HTMLElement = fixture.nativeElement;
    const span = niceButtonElement.querySelector('span')!;
    expect(span.textContent).toEqual('');
  });

  it('should display icon when set accordingly', () => {
    component.icon = "💀";
    fixture.detectChanges();
    const niceButtonElement: HTMLElement = fixture.nativeElement;
    const span = niceButtonElement.querySelector('span')!;
    expect(span.textContent).toEqual("💀");
  });

  it('should emit correct event on click', () => {
    component.onClick.subscribe((displayableID:number) => {
      expect(displayableID).toBe(-1);
    });
    fixture.nativeElement.querySelector('button').click();
  });

  it('should react to changing ids', () => {
    component.displayable = {"id":42,"name":"cooler_name"};
    component.onClick.subscribe((displayableID:number) => {
      expect(displayableID).toBe(42);
    });
    fixture.nativeElement.querySelector('button').click();
  });
});
