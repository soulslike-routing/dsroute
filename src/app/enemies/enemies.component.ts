import {Component, EventEmitter, Input, Output} from '@angular/core';
import {RouteService} from "../route.service";
import {Enemy} from "../enemy.interface";

@Component({
  selector: 'dsr-enemies',
  templateUrl: './enemies.component.html',
  styleUrls: ['./enemies.component.css']
})
export class EnemiesComponent {
  @Input() possibleEnemies: Enemy[] = [];
  @Output() stateChanged = new EventEmitter();

  constructor(private routeService: RouteService) {}

  kill(ID: number): void {
    this.routeService.kill(ID);
    this.stateChanged.emit();
  }
}
