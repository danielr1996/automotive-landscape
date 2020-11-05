import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeComponent } from './tree/tree.component';
import { NodeComponent } from './node/node.component';
import { LinkComponent } from './link/link.component';



@NgModule({
  declarations: [TreeComponent, NodeComponent, LinkComponent],
  exports: [
    TreeComponent
  ],
  imports: [
    CommonModule
  ],
})
export class TreeModule { }
