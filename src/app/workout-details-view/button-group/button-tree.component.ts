import {Component, Input, OnInit} from '@angular/core';
import {ButtonNode} from "./button-node";

@Component({
  selector: 'app-button-group',
  template: `
    <div class="uk-grid uk-grid-collapse">

      <div class="uk-width-3-5">
        <button class="uk-button uk-width-1-1 uk-text-truncate"
                [ngClass]="getLevelClass()"
                (click)="toggleNode()">{{node.name}}
          <span *ngIf="!node.isLeaf()">({{node.numberOfChildren()}})</span>
        </button>
      </div>
      <div class="uk-width-2-5">
        <button class="" routerLink="">[x]</button>
        <button *ngIf="!node.isLeaf()" class="">[+]</button>
        <button class=" ">[E]</button>
      </div>
    </div>
    <div *ngIf="shouldShowChildren()">
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

  shouldShowChildren() {
    return this.isEnabled() && this.node.hasChildren();
  }

  private isEnabled() {
    return this.toggles[this.node.name];
  }

  toggleNode() {
    this.toggles[this.node.name] = !this.toggles[this.node.name];
  }

  getLevelClass() {
    switch (this.node.level) {
      case 1:
        return 'uk-button-secondary';
      case 2:
        return 'uk-button-primary';
      case 3:
        return 'uk-button-default';
    }
  }
}
