import {Component, OnInit} from '@angular/core';
import {WorkoutService} from "../shared/workout.service";
import {MuscleGroup} from "../shared/muscle-group";

@Component({
  selector: 'app-workout',
  template: `
    <div>{{title}}</div>
    <app-muscle-group-display [selectedMuscleGroups]="selectedMuscleGroups"></app-muscle-group-display>
    <app-muscle-group-selection [muscleGroups]="muscleGroups"
                                (selectMuscleGroup)="selectMuscleGroups($event)"></app-muscle-group-selection>
    <button routerLink="/create-muscle-group">Create Muscle Group</button>
  `,
  styles: []
})
export class WorkoutOverview implements OnInit {
  title: string = new Date().toDateString();
  muscleGroups: MuscleGroup[] = [];
  selectedMuscleGroups: MuscleGroup[] = [];

  constructor(private workoutService: WorkoutService) {
  }

  ngOnInit() {
    this.workoutService.fetchMuscleGroups()
      .subscribe(muscleGroups => {
        this.muscleGroups = muscleGroups;
      })
  }

  selectMuscleGroups(muscleGroup: MuscleGroup) {
    this.selectedMuscleGroups.push(muscleGroup);
    this.muscleGroups = this.muscleGroups.filter(e => e.name !== muscleGroup.name);
  }
}
