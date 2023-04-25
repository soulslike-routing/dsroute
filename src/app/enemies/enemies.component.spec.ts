import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { EnemiesComponent } from './enemies.component';
import { NiceButtonComponent } from '../nice-button/nice-button.component';
import { By } from '@angular/platform-browser';

describe('EnemiesComponent', () => {
  let component: EnemiesComponent;
  let fixture: ComponentFixture<EnemiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnemiesComponent,NiceButtonComponent ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnemiesComponent);
    component = fixture.componentInstance;
    component.possibleEnemies = [
      {"id":0,"name":"e0","killed":false,"respawns":true,"unlocks":[0, 1]},
      {"id":1,"name":"e1","killed":true,"respawns":false,"unlocks":[2, 3]}
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not display container without enemies', () => {
    component.possibleEnemies = [];
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.button-container-container'))).toBeNull();
  });

  it('should display correct text when enemies are missing', () => {
    component.possibleEnemies = [];
    fixture.detectChanges();
    const enemiesElement: HTMLElement = fixture.nativeElement;
    const h4 = enemiesElement.querySelector('h4')!;
    expect(h4.textContent).toEqual("There are no enemies to kill here");
  });

  it('should display correct amount of buttons', () => {
    const enemiesDebug: DebugElement = fixture.debugElement;
    const buttons = enemiesDebug.queryAll(By.css('dsr-nice-button'));
    expect(buttons.length).toEqual(component.possibleEnemies.length);
  });

  it('should pass the correct objects down to the buttons', () => {
    const enemiesDebug: DebugElement = fixture.debugElement;
    const buttons = enemiesDebug.queryAll(By.directive(NiceButtonComponent));
    expect(buttons[0].componentInstance.displayable).toEqual({"id":0,"name":"e0","killed":false,"respawns":true,"unlocks":[0, 1]});
    expect(buttons[1].componentInstance.displayable).toEqual({"id":1,"name":"e1","killed":true,"respawns":false,"unlocks":[2, 3]});
  });

  it('should pass empty string when enemy respawns', () => {
    const enemiesDebug: DebugElement = fixture.debugElement;
    const buttons = enemiesDebug.queryAll(By.directive(NiceButtonComponent));
    expect(buttons[0].componentInstance.icon).toEqual('');
  });

  it('should pass a skull as icon when an enemy doesnt respawn', () => {
    const enemiesDebug: DebugElement = fixture.debugElement;
    const buttons = enemiesDebug.queryAll(By.directive(NiceButtonComponent));
    expect(buttons[1].componentInstance.icon).toEqual('💀');
  });

  it('should emit an event when kill is called', () => {
    spyOn(component.stateChanged, 'emit');
    component.kill(0);
    expect(component.stateChanged.emit).toHaveBeenCalled();
  });
});
