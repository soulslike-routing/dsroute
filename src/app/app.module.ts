import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LocationCardComponent } from './location-card/location-card.component';
import { MovementComponent } from './movement/movement.component';
import { ItemsComponent } from './items/items.component';
import { EnemiesComponent } from './enemies/enemies.component';
import { NiceButtonComponent } from './nice-button/nice-button.component';
import { RouteCardComponent } from './route-card/route-card.component';
import { EditActionModalComponent } from './route-card/edit-action-modal/edit-action-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    LocationCardComponent,
    MovementComponent,
    ItemsComponent,
    EnemiesComponent,
    NiceButtonComponent,
    RouteCardComponent,
    EditActionModalComponent,
  ],
  imports: [
    BrowserModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
