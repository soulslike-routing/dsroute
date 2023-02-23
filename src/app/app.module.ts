import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LocationCardComponent } from './location-card/location-card.component';
import { MovementComponent } from './movement/movement.component';
import { ItemsComponent } from './items/items.component';
import { EnemiesComponent } from './enemies/enemies.component';
import { NiceButtonComponent } from './nice-button/nice-button.component';


@NgModule({
  declarations: [
    AppComponent,
    LocationCardComponent,
    MovementComponent,
    ItemsComponent,
    EnemiesComponent,
    NiceButtonComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
