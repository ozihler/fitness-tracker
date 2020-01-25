import {Component, Input, OnInit} from '@angular/core';
import {MuscleGroup} from "../shared/muscle-group";
import {SubtreeFactory} from "../shared/subtree.factory";
import {ButtonNode} from "./button-group/button-node";

@Component({
  selector: 'app-workout-details-view',
  template: `
    <div *ngFor="let node of subtree">
      <app-button-group [node]="node"></app-button-group>
    </div>
  `,
  styles: []
})
export class WorkoutDetailsView implements OnInit {

  @Input() selectedMuscleGroups: MuscleGroup[] = [];
  subtree: ButtonNode[];

  constructor() {
  }

  ngOnInit() {
    this.subtree = this.selectedMuscleGroups.map(muscleGroup => SubtreeFactory.from(muscleGroup));
  }
}
