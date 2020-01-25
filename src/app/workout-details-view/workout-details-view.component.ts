import {Component, Input, OnInit} from '@angular/core';
import {MuscleGroup} from "../shared/muscle-group";
import {SubtreeFactory} from "../shared/subtree.factory";
import {ButtonNode} from "./button-group/button-node";
import {Id} from "../shared/id";
import {WorkoutService} from "../shared/workout.service";
import {Exercise} from "../shared/exercise";

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
  @Input() selectedMuscleGroups: MuscleGroup[] = [];
  subtree: ButtonNode[];

  constructor(private workoutService: WorkoutService) {
  }

  ngOnInit() {
    this.subtree = this.selectedMuscleGroups.map(muscleGroup => SubtreeFactory.from(muscleGroup));
  }

  deleteNode(id: Id) {
    let muscleGroups = this.selectedMuscleGroups.filter(mG => mG.name === id.value);
    if (muscleGroups.length === 1) {
      this.workoutService.deleteMuscleGroup(muscleGroups[0]);
    } else {
      this.tryDeleteExerciseWithId(this.selectedMuscleGroups, id);
    }
  }

  private tryDeleteExerciseWithId(muscleGroups: MuscleGroup[], id: Id) {
    muscleGroups.forEach(muscleGroup => {
      if (!muscleGroup.exercises) {
        return;
      }
      let exercises = muscleGroup.exercises.filter(e => e.name == id.value);
      if (exercises.length === 1) {
        this.workoutService.deleteExercise(exercises[0]);
      } else {
        this.tryDeleteSet(muscleGroup.exercises, id);
      }
    });
  }

  private tryDeleteSet(exercises: Exercise[], id: Id) {
    let idParts = id.parts();
    if (idParts.length !== 2) {
      return;
    }
    exercises.forEach(exercise => {
      if (exercise.name === idParts[0]) {
        let indexInSets = Number(idParts[1]);
        this.workoutService.deleteSet(exercise, indexInSets);
      }
    });
  }
}
