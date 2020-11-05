import {Component, Input, OnInit} from '@angular/core';
import {ORIENTATION} from "../../landscape/landscape.component";

@Component({
  selector: 'g[app-link]',
  template: `
    <svg:path
      attr.d="M{{link.source.x}} {{link.source.y}}
                   C {{controlSource.x}} {{controlSource.y}}
                   {{controlTarget.x}} {{controlTarget.y}}
                   {{link.target.x}} {{link.target.y}}
                   "/>
  `,
  styles: [`
    :host {
      stroke-width: 2;
      stroke: black;
      fill: transparent;
    }
  `]
})
export class LinkComponent {
  radius: 30;
  @Input() link: any;
  @Input() orientation: ORIENTATION;

  get controlSource(): { x: number, y: number } {
    return this.orientation === 'horizontal' ? {
      x: (this.link.source.x + this.link.target.x) / 2,
      y: this.link.source.y
    } : {
      x: this.link.source.x,
      y: (this.link.source.y + this.link.target.y) / 2
    };
  }

  get controlTarget(): { x: number, y: number } {
    return this.orientation === 'horizontal' ? {
      x: (this.link.source.x + this.link.target.x) / 2,
      y: this.link.target.y
    } : {
      x: this.link.target.x,
      y: (this.link.source.y + this.link.target.y) / 2
    };
  }
}
