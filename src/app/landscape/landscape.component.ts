import {Component, Input, OnInit} from '@angular/core';
import {TreeData} from '../tree/tree/tree.component';

@Component({
  selector: 'app-landscape',
  template: `
    <app-tree [data]="this.data" [orientation]="this.orientation"></app-tree>
  `,
  styles: [``]
})
export class LandscapeComponent implements OnInit {
  public data: TreeData<any> = {
    id: 'Fake Root',
    children: [
      {
        id: 'BMW Neue Klasse',
        children: [
          {
            id: 'BMW E21',
            children: [
              {
                id: 'BMW E30',
                children: [
                  {
                    id: 'BMW E36',
                    children: [
                      {
                        id: 'BMW E46',
                        children: [
                          {
                            id: 'BMW E92',
                            children: [
                              {
                                id: 'BMW F32',
                                children: [
                                  {
                                    id: 'BMW G22'
                                  }
                                ]
                              },
                              {
                                id: 'BMW F30',
                                children: [
                                  {
                                    id: 'BMW G20'
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            id: 'BMW E81',
                            children: [
                              {
                                id: 'BMW F20',
                                children: [
                                  {
                                    id: 'BMW F40'
                                  }
                                ]
                              },
                              {
                                id: 'BMW F22'
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
            id: 'BMW E12',
            children: [
              {
                id: 'BMW E28',
                children: [
                  {
                    id: 'BMW E34',
                    children: [
                      {
                        id: 'BMW E39',
                        children: [
                          {
                            id: 'BMW E60',
                            children: [
                              {
                                id: 'BMW F10',
                                children: [
                                  {
                                    id: 'BMW G30'
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
            id: 'BMW E24',
            children: [
              {
                id: 'BMW E63',
                children: [
                  {
                    id: 'BMW F12'
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'BMW 501',
        children: [
          {
            id: 'BMW E3',
            children: [
              {
                id: 'BMW E23',
                children: [
                  {
                    id: 'BMW E32',
                    children: [
                      {
                        id: 'BMW E38',
                        children: [
                          {
                            id: 'BMW E65',
                            children: [
                              {
                                id: 'BMW F01',
                                children: [
                                  {
                                    id: 'BMW G11',
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
          }
        ]
      },
      {
        id: 'BMW E9',
        children: [
          {
            id: 'BMW E31',
            children: [
              {id: 'BMW G14'}
            ]
          }
        ]
      }
    ]
  };
  @Input() orientation: ORIENTATION;

  ngOnInit(): void {
  }
}

export declare type ORIENTATION = 'vertical' | 'horizontal';


