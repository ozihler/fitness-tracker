import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {WorkoutService} from "../shared/workout.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-create-muscle-group',
  template: `
    <form [formGroup]="createMuscleGroup"
          (ngSubmit)="submitMuscleGroup()">
      <input formControlName="muscleGroup" type="text">
      <button type="submit">Ok</button>
    </form>
    <div>{{createMuscleGroup.get('muscleGroup').value}}</div>
  `,
  styles: []
})
export class CreateMuscleGroupComponent implements OnInit {

  private createMuscleGroup: FormGroup;

  constructor(private workoutService: WorkoutService, private location: Location) {

  }

  ngOnInit() {
    this.createMuscleGroup = new FormGroup({
      muscleGroup: new FormControl("", Validators.required)
    });
  }

  submitMuscleGroup() {
    let muscleGroupName = this.createMuscleGroup.get('muscleGroup').value;
    if (!muscleGroupName.trim()) {
      return;
    }
    this.workoutService.newMuscleGroup(muscleGroupName)
      .subscribe(this.goBackInHistory());
  }

  private goBackInHistory() {
    return () => {
      this.location.back();
    }
  }
}
