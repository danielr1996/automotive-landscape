import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LandscapeComponent} from './landscape.component';
import {TreeModule} from '../tree/tree.module';



@NgModule({
  declarations: [
    LandscapeComponent
  ],
  exports: [
    LandscapeComponent
  ],
  imports: [
    CommonModule,
    TreeModule
  ]
})
export class LandscapeModule { }
