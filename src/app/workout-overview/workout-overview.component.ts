import {Component, OnInit} from '@angular/core';
import {WorkoutService} from "../shared/workout.service";
import {MuscleGroup} from "../shared/muscle-group";
import {Id} from "../shared/id";
import {Exercise} from "../shared/exercise";
import {SubtreeFactory} from "../shared/subtree.factory";
import {ButtonNode} from "../workout-details-view/button-group/button-node";

@Component({
  selector: 'app-workout',
  template: `
    <div>{{title}}</div>
    =============================
    <app-workout-details-view
      [subtree]="subtree"
      (deleteNodeEvent)="deleteNode($event)">
    </app-workout-details-view>
    =============================
    <app-muscle-group-selection
      [muscleGroups]="muscleGroups"
      (selectMuscleGroup)="selectMuscleGroups($event)">
    </app-muscle-group-selection>
    =============================
    <button routerLink="/create-muscle-group">Create Muscle Group</button>
  `,
  styles: []
})
export class WorkoutOverview implements OnInit {
  title: string = new Date().toDateString();
  muscleGroups: MuscleGroup[] = [];
  selectedMuscleGroups: MuscleGroup[] = [];
  subtree: ButtonNode[] = []

  constructor(private workoutService: WorkoutService) {
  }

  ngOnInit() {
    this.workoutService.fetchMuscleGroups()
      .subscribe(muscleGroups => {
        this.muscleGroups = muscleGroups;
      });

    this.selectedMuscleGroups = WorkoutService.dummyData().muscleGroups;
    this.subtree = this.selectedMuscleGroups.map(muscleGroup => SubtreeFactory.from(muscleGroup));

  }

  selectMuscleGroups(muscleGroup: MuscleGroup) {
    this.selectedMuscleGroups.push(muscleGroup);
    this.subtree = this.selectedMuscleGroups.map(muscleGroup => SubtreeFactory.from(muscleGroup));

    this.muscleGroups = this.muscleGroups.filter(e => e.name !== muscleGroup.name);
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

