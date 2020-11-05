import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'g[app-node]',
  template: `
    <svg:circle
      attr.cx="{{data.x}}"
      attr.cy="{{data.y}}"
      attr.r="{{radius}}"/>
    <svg:text
      attr.x="{{data.x-radius/2-14}}"
      attr.y="{{data.y+radius+12}}"
      fill="black">{{data.data.id}}
    </svg:text>
  `
})
export class NodeComponent {
  @Input() radius: any;
  @Input() data: any;
}
