import {Component, Input, OnInit} from '@angular/core';
import {ButtonNode} from "./button-node";

@Component({
  selector: 'app-button-group',
  template: `
    <div class="uk-grid uk-grid-collapse">
      <div class="uk-width-1-5">
        <button class="uk-button">[x]</button>
      </div>
      <div class="uk-width-3-5">
        <button class="uk-button uk-width-1-1 "
                (click)="toggleNode()">{{node.name | fitScreen }}
          <span *ngIf="!node.isLeaf()">({{node.numberOfChildren()}})</span>
        </button>
      </div>
      <div class="uk-width-1-5">
        <button class="uk-button">[+]</button>
      </div>
    </div>
    <div *ngIf="showChildren()">
      <div *ngFor="let child of this.node.children">
        <app-button-group
          [node]="child">
        </app-button-group>
      </div>
    </div>
  `
})
export class ButtonTreeComponent implements OnInit {
  @Input() private node: ButtonNode;

  private toggles = [];

  constructor() {
  }

  ngOnInit() {
    this.toggles[this.node.name] = false;
  }

  showChildren() {
    return this.toggles[this.node.name]
      && !this.node.isLeaf();
  }

  toggleNode() {
    this.toggles[this.node.name] = !this.toggles[this.node.name];
  }
}
