import {Component, Input, OnInit} from '@angular/core';
import {MuscleGroup} from "../shared/muscle-group";

@Component({
  selector: 'app-workout-details-view',
  template: `
    <div *ngFor="let muscleGroup of selectedMuscleGroups">
      <button (click)="toggleExercises(muscleGroup.name)">{{muscleGroup.name}}<span
        *ngIf="!shouldShowExercisesOf(muscleGroup)"> ({{muscleGroup.exercises.length}})</span></button>

      <div *ngFor="let exercise of muscleGroup.exercises">
        <div *ngIf="shouldShowExercisesOf(muscleGroup)">
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
    </div>
  `,
  styles: []
})
export class WorkoutDetailsView implements OnInit {

  @Input() selectedMuscleGroups: MuscleGroup[] = [];
  private toggles = [];

  constructor() {
  }

  ngOnInit() {
    this.initialiseToggles();
  }

  private initialiseToggles() {
    this.selectedMuscleGroups.forEach(muscleGroup => {
        this.toggles[muscleGroup.name] = false;

        muscleGroup.exercises.forEach(exercise => {
          this.toggles[exercise.name] = false;
        })
      }
    )
  }

  toggleExercises(muscleGroupName: string) {
    this.toggles[muscleGroupName] = !this.toggles[muscleGroupName];
  }

  shouldShowExercisesOf(muscleGroup: MuscleGroup) {
    return this.toggles[muscleGroup.name];
  }

}
