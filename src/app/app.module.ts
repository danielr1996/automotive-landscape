import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {LandscapeModule} from './landscape/landscape.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LandscapeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
