import {Component, Input, OnInit} from '@angular/core';
import {MuscleGroup} from "../shared/muscle-group";
import {Exercise} from "../shared/exercise";

@Component({
  selector: 'app-workout-details-view',
  template: `
    <div *ngFor="let muscleGroup of selectedMuscleGroups">
      <button (click)="toggle(muscleGroup.name)">{{muscleGroup.name}} <span
        *ngIf="!shouldShowExercisesOf(muscleGroup)">({{muscleGroup.exercises.length}})</span></button>

      <div *ngFor="let exercise of muscleGroup.exercises">
        <div *ngIf="shouldShowExercisesOf(muscleGroup)">
          <button (click)="toggle(exercise.name)">{{exercise.name}} <span
            *ngIf="!shouldShowSetsOf(exercise)">({{numberOfSetsIn(exercise)}})</span></button>
          <div *ngIf="shouldShowSetsOf(exercise)">
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

  toggle(name: string) {
    this.toggles[name] = !this.toggles[name];
  }

  shouldShowExercisesOf(muscleGroup: MuscleGroup) {
    return this.shouldShowToggleOf(muscleGroup.name);
  }

  shouldShowSetsOf(exercise: Exercise) {
    return this.shouldShowToggleOf(exercise.name) && this.numberOfSetsIn(exercise) > 0;
  }

  private shouldShowToggleOf(name: string): boolean {
    return this.toggles[name];
  }

  numberOfSetsIn(exercise: Exercise) {
    return exercise.sets ? exercise.sets.length : 0;
  }
}
