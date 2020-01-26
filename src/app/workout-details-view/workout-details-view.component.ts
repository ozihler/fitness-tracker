import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ButtonNode} from "./button-group/button-node";
import {Id} from "../shared/id";

@Component({
  selector: 'app-workout-details-view',
  template: `
    <div *ngFor="let node of subtree">
      <app-button-group [node]="node" (deleteNodeEvent)="deleteNode($event)"></app-button-group>
    </div>
  `,
  styles: []
})
export class WorkoutDetailsView implements OnInit {
  @Input() subtree: ButtonNode[] = [];
  @Output() deleteNodeEvent = new EventEmitter<Id>();

  constructor() {
  }

  ngOnInit() {
    console.log(this.subtree);
  }

  deleteNode(id: Id) {
    this.deleteNodeEvent.emit(id);
  }
}
