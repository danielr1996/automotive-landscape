import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import * as d3 from 'd3';
import createPanZoom from 'panzoom';

@Component({
  selector: 'app-landscape',
  template: `
    <svg #svg>
      <g #scene attr.transform="translate({{margin}},{{margin}})">
        <!--        <line class="line" *ngFor="let link of links"-->
        <!--              [attr.x1]="this.rotateCoordinates(this.orientation)(link.source).x"-->
        <!--              [attr.x2]="this.rotateCoordinates(this.orientation)(link.target).x"-->
        <!--              [attr.y1]="this.rotateCoordinates(this.orientation)(link.source).y"-->
        <!--              [attr.y2]="this.rotateCoordinates(this.orientation)(link.target).y"></line>-->
        <g *ngFor="let link of links">
<!--                    <circle attr.cx="{{this.rotateCoordinates(this.orientation)(link.controlSource).x}}" attr.cy="{{this.rotateCoordinates(this.orientation)(link.controlSource).y}}" fill="blue" r="5"></circle>-->
<!--                    <circle attr.cx="{{this.rotateCoordinates(this.orientation)(link.controlTarget).x}}" attr.cy="{{this.rotateCoordinates(this.orientation)(link.controlTarget).y}}" fill="green" r="5"></circle>-->
          <!--          <path class="line" [attr.d]='"M" + this.rotateCoordinates(this.orientation)(link.source).x + "," + this.rotateCoordinates(this.orientation)(link.source).y + "A" + link.curve.dr + "," + link.curve.dr + " 0 0,1 " + this.rotateCoordinates(this.orientation)(link.target).x + "," + this.rotateCoordinates(this.orientation)(link.target).y'></path>-->
          <path class="line"
                attr.d="M{{this.rotateCoordinates(this.orientation)(link.source).x}} {{this.rotateCoordinates(this.orientation)(link.source).y}}
                 C {{this.rotateCoordinates(this.orientation)(link.controlSource).x}} {{this.rotateCoordinates(this.orientation)(link.controlSource).y}}
                 {{this.rotateCoordinates(this.orientation)(link.controlTarget).x}} {{this.rotateCoordinates(this.orientation)(link.controlTarget).y}}
                 {{this.rotateCoordinates(this.orientation)(link.target).x}} {{this.rotateCoordinates(this.orientation)(link.target).y}}
                 "
          ></path>
        </g>
        <g *ngFor="let node of nodes">
          <circle
            [attr.cx]="this.rotateCoordinates(this.orientation)(node).x"
            [attr.cy]="this.rotateCoordinates(this.orientation)(node).y"
            [attr.r]="radius"></circle>
          <text [attr.x]="this.rotateCoordinates(this.orientation)(node).x" [attr.dx]="-radius/2-14" [attr.dy]="+radius+12" a
                [attr.y]="this.rotateCoordinates(this.orientation)(node).y" fill="black">{{node.data.name}}</text>
        </g>
      </g>
    </svg>
  `,
  styles: [`
    :host {
      display: block;
      /*background-color: aqua;*/
    }

    svg {
      /*background-color: rebeccapurple;*/
      height: 100%;
      width: 100%;
      /*border: 1px solid red;*/
    }

    .line {
      stroke-width: 2;
      stroke: black;
      fill: transparent;
    }

    text {
      z-index: 999;
    }
  `]
})
export class LandscapeComponent implements OnInit, OnChanges {
  public radius = 30;
  public margin = this.radius * 2;
  private data = {
    name: 'BMW Neue Klasse',
    children: [
      {
        name: 'BMW E21',
        children: [
          {
            name: 'BMW E30',
            children: [
              {
                name: 'BMW E36',
                children: [
                  {
                    name: 'BMW E46',
                    children: [
                      {
                        name: 'BMW E92',
                        children: [
                          {
                            name: 'BMW F32',
                            children: [
                              {
                                name: 'BMW G22'
                              }
                            ]
                          },
                          {
                            name: 'BMW F30',
                            children: [
                              {
                                name: 'BMW G20'
                              }
                            ]
                          }
                        ]
                      },
                      {
                        name: 'BMW E81',
                        children: [
                          {
                            name: 'BMW F20',
                            children: [
                              {
                                name: 'BMW F40'
                              }
                            ]
                          },
                          {
                            name: 'BMW F22'
                          }
                        ]
                      },
                    ]
                  },
                ]
              },
            ]
          },
        ]
      },
      {
        name: 'BMW E12',
        children: [
          {
            name: 'BMW E28',
            children: [
              {
                name: 'BMW E34',
                children: [
                  {
                    name: 'BMW E39',
                    children: [
                      {
                        name: 'BMW E60',
                        children: [
                          {
                            name: 'BMW F10',
                            children: [
                              {
                                name: 'BMW G30'
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        name: 'BMW E24',
        children: [
          {
            name: 'BMW E63',
            children: [
              {
                name: 'BMW F12'
              }
            ]
          }
        ]
      }
    ]
  };
  public root = d3.hierarchy(this.data);
  public nodes = [];
  public links = [];
  private size: [number, number] = [0, 0];
  @Input() orientation: ORIENTATION;

  @ViewChild('svg', {static: true}) canvas;
  @ViewChild('scene', {static: true}) scene;
  public rotateCoordinates = (rotation: ORIENTATION) => (coordinates: { x: number, y: number }): { x: number, y: number } => rotation === 'vertical' ? coordinates : {
    x: coordinates.y,
    y: coordinates.x
  }

  ngOnInit(): void {
    createPanZoom(this.scene.nativeElement);
    this.size = [
      this.canvas.nativeElement.getBoundingClientRect().width - this.margin * 2,
      this.canvas.nativeElement.getBoundingClientRect().height - this.margin * 2,
    ];
    this.updateTree();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateTree();
  }

  updateTree(): void {
    const treelayout = d3.tree();
    treelayout.size(rotateSize(this.orientation)(this.size));
    treelayout(this.root);
    this.nodes = this.root.descendants();
    this.links = this.root.links().map(d => {
      const dx = d.target['x'] - d.source['x'];
      const dy = d.target['y'] - d.source['y'];
      const dr = Math.sqrt(dx * dx + dy * dy);
      return ({
        ...d,
        // Blue
        controlSource: {
          x: d.source['x'],
          y: (d.source['y']+d.target['y'])/2,
        },
        // Green
        controlTarget: {
          x: d.target['x'],
          y: (d.source['y']+d.target['y'])/2,
        }
      });
    });
  }
}

export declare type ORIENTATION = 'vertical' | 'horizontal';


const rotateSize = (rotation: ORIENTATION) => (size: [number, number]): [number, number] => rotation === 'vertical' ? size : [size[1], size[0]];
