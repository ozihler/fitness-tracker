import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ButtonNode} from "./button-node";
import {Id} from "../../shared/id";

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
        <button class="" (click)="deleteNode(node.id)">[x]</button>
        <button *ngIf="!node.isLeaf()" class="">[+]</button>
        <button class=" ">[E]</button>
      </div>
    </div>
    <div *ngIf="shouldShowChildren()">
      <div *ngFor="let child of this.node.children">
        <app-button-group
          (deleteNodeEvent)="deleteNode($event)"
          [node]="child">
        </app-button-group>
      </div>
    </div>
  `
})
export class ButtonTreeComponent implements OnInit {
  @Input() private node: ButtonNode;
  @Output() private deleteNodeEvent = new EventEmitter<Id>();

  private toggles = [];
  private levelClasses = {1: 'uk-button-secondary', 2: 'uk-button-primary', 3: 'uk-button-default'};

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
    return this.levelClasses[this.node.level];
  }

  deleteNode(id: Id) {
    this.deleteNodeEvent.emit(id);
  }
}
