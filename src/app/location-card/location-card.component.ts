import {ChangeDetectorRef, Component} from '@angular/core';
import {RouteService} from "../route.service";
import {Location} from "../location";
import {Item} from "../item";
import {Enemy} from "../enemy";

@Component({
  selector: 'dsr-location-card',
  templateUrl: './location-card.component.html',
  styleUrls: ['./location-card.component.css']
})
export class LocationCardComponent {

  location: Location = this.routeService.getCurrentLocation();
  possibleMovements:Location[] = this.routeService.possibleLocations();
  possibleItems:Item[] = this.routeService.possibleItems();
  possibleEnemies:Enemy[] = this.routeService.possibleEnemies();

  constructor(private routeService: RouteService, private ref: ChangeDetectorRef) {}

  ngOnInit() {
    this.location = this.routeService.getCurrentLocation();
  }

  onStateChange(): void {
    this.location = this.routeService.getCurrentLocation();
    this.possibleMovements = this.routeService.possibleLocations();
    this.possibleItems = this.routeService.possibleItems()
    this.possibleEnemies = this.routeService.possibleEnemies();
  }
}
