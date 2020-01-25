import {Component, Input, OnInit} from '@angular/core';
import {MuscleGroup} from "../shared/muscle-group";

@Component({
  selector: 'app-workout-details-view',
  template: `
    <div *ngFor="let muscleGroup of selectedMuscleGroups">
      <button>{{muscleGroup.name}}</button>
      <div *ngFor="let exercise of muscleGroup.exercises">
        <button>{{exercise.name}}</button>
        <div *ngFor="let set of exercise.sets">
          <span>{{set.repetitions}}</span>
          <span> [reps]</span>
          <span> | </span>
          <span>{{set.weight}}</span>
          <span> [kg]</span>
          <span> | </span>
          <span>{{set.waitingTime}}</span>
          <span> [s]</span>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class WorkoutDetailsView implements OnInit {

  @Input() selectedMuscleGroups: MuscleGroup[] = [];

  constructor() {
  }

  ngOnInit() {
  }

}
