import {Component, Input, OnInit} from '@angular/core';
import {MuscleGroup} from "../shared/muscle-group";
import {Exercise} from "../shared/exercise";
import {numberOfElementsIn} from "../shared/array-utils";

@Component({
  selector: 'app-workout-details-view',
  template: `
    <div *ngFor="let muscleGroup of selectedMuscleGroups">

      <div class="uk-grid">
        <div class="uk-width-1-5">
          <button class="uk-button">[x]</button>
        </div>
        <div class="uk-width-3-5">
          <button class="uk-button uk-align-cent uk-width-1-1"
                  (click)="toggle(muscleGroup.name)">{{muscleGroup.name | fitScreen }}

            <span *ngIf="!shouldShowExercisesOf(muscleGroup)">
                    ({{numberOfExercisesIn(muscleGroup)}})
                </span>
          </button>
        </div>
        <div class="uk-width-1-5">
          <button class="uk-button">[+]</button>
        </div>
      </div>

      <div *ngIf="shouldShowExercisesOf(muscleGroup)">
        <div *ngFor="let exercise of muscleGroup.exercises">

          <div class="uk-grid">
            <div class="uk-width-1-5">
              <button class="uk-button">[x]</button>
            </div>
            <div class="uk-width-2-5">
              <button class="uk-button"
                      (click)="toggle(exercise.name)">{{exercise.name | fitScreen}}
                <span
                  *ngIf="!shouldShowSetsOf(exercise)">({{numberOfSetsIn(exercise)}})
            </span>
              </button>
            </div>
            <div class="uk-width-1-5">
              <button class="uk-button">[+]</button>
            </div>
          </div>

          <div *ngIf="shouldShowSetsOf(exercise)">
            <div class="uk-grid" *ngFor="let set of exercise.sets">
              <span>{{set.repetitions}}[reps]|{{set.weight}}[kg]|{{set.waitingTime}}[s]</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  `,
  styles: []
})
export class WorkoutDetailsView implements OnInit {

  // todo extract component for button group and use it for both exercise and muscle groups
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
    return this.shouldShowToggleOf(muscleGroup.name) && this.numberOfExercisesIn(muscleGroup);
  }

  shouldShowSetsOf(exercise: Exercise) {
    return this.shouldShowToggleOf(exercise.name) && this.numberOfSetsIn(exercise) > 0;
  }

  private shouldShowToggleOf(name: string): boolean {
    return this.toggles[name];
  }

  numberOfExercisesIn(muscleGroup: MuscleGroup) {
    return numberOfElementsIn(muscleGroup.exercises);
  }

  numberOfSetsIn(exercise: Exercise) {
    return numberOfElementsIn(exercise.sets);
  }
}
