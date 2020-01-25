import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {WorkoutService} from "../shared/workout.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-create-muscle-group',
  template: `
    <form [formGroup]="createMuscleGroup"
          (ngSubmit)="create()">
      <div class="uk-margin">
        <input class="uk-input"
               formControlName="muscleGroup"
               type="text">
      </div>
      <button type="submit">Ok</button>
    </form>
    <div>{{currentMuscleGroupName()}}</div>
  `,
  styles: []
})
export class CreateMuscleGroupComponent implements OnInit {

  private createMuscleGroup: FormGroup;

  constructor(private workoutService: WorkoutService,
              private location: Location) {

  }

  ngOnInit() {
    this.createMuscleGroup = new FormGroup({
      muscleGroup: new FormControl("", Validators.required)
    });
  }

  create() {
    if (this.hasEnteredAnyMuscleGroupName()) {
      this.workoutService.newMuscleGroup(this.currentMuscleGroupName())
        .subscribe(this.goBackInHistory());
    }
  }

  private hasEnteredAnyMuscleGroupName() {
    return !!this.currentMuscleGroupName();
  }

  private currentMuscleGroupName() {
    return this.createMuscleGroup.get('muscleGroup').value.trim();
  }

  private goBackInHistory() {
    return () => {
      this.location.back();
    }
  }
}
