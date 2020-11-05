import {Component, Input, OnInit, ViewChild} from '@angular/core';
import * as d3 from 'd3';
import {ORIENTATION} from '../../landscape/landscape.component';
import createPanZoom from 'panzoom';

@Component({
  selector: 'app-tree',
  template: `
    <svg #svg>
      <g #scene>
        <g app-node *ngFor="let node of nodes" [radius]="this.radius" [data]="node"></g>
        <g app-link *ngFor="let link of links" [orientation]="this.orientation" [link]="link"></g>
      </g>
    </svg>`,
  styles: [`
    svg {
      height: 100%;
      width: 100%;
    }
  `]
})
export class TreeComponent implements OnInit {
  @Input() data: TreeData<any>;

  private _orientation: ORIENTATION;
  @Input()
  set orientation(orientation: ORIENTATION) {
    [this.nodes, this.links] = this.calculateLayout(orientation);
    this._orientation = orientation;
  }

  get orientation(): ORIENTATION {
    return this._orientation;
  }

  @ViewChild('svg', {static: true}) svg;
  @ViewChild('scene', {static: true}) scene;
  public radius = 15;
  public nodes;
  public links;

  constructor() {
  }

  ngOnInit(): void {
    createPanZoom(this.scene.nativeElement);
  }

  private calculateLayout(orientation: ORIENTATION): any {
    const treelayout = d3.tree();
    const root = d3.hierarchy(this.data);
    const size: [number, number] = orientation === 'horizontal' ? [
      this.svg.nativeElement.getBoundingClientRect().height,
      this.svg.nativeElement.getBoundingClientRect().width,
    ] : [
      this.svg.nativeElement.getBoundingClientRect().width,
      this.svg.nativeElement.getBoundingClientRect().height,
    ];
    treelayout.size((size));
    treelayout(root);
    const nodes = orientation === 'horizontal' ? root.descendants()
      .map(node => {
        return {
          ...node,
          x: node['y'],
          y: node['x']
        };
      }) : root.descendants();
    const links = orientation === 'horizontal' ? root.links().map(link => {
      return {
        ...link,
        source: {
          ...link.source,
          x: link.source['y'],
          y: link.source['x']
        },
        target: {
          ...link.target,
          x: link.target['y'],
          y: link.target['x']
        }
      };
    }) : root.links();
    return [nodes, links];
  }

}

export type TreeData<T> = {
  id: string,
  children?: TreeData<T>[],
  metadata?: any,
};
