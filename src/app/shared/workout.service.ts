import {Injectable} from '@angular/core';
import {from, Observable} from "rxjs";
import {MuscleGroup} from "./muscle-group";
import {MuscleGroupFactory} from "./muscle-group.factory";
import {Workout} from "./workout";
import {WorkoutFactory} from "./workout.factory";


@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private muscleGroups: MuscleGroup[] = [];
  static idCounter = 1;

  constructor() {
  }

  newMuscleGroup(muscleGroupNames: string): Observable<MuscleGroup[]> {
    let createdMuscleGroups: MuscleGroup[] = [];
    muscleGroupNames
      .split(/[ ;,.]+/)
      .forEach(muscleGroupName => {
        if (muscleGroupName.trim().length > 0) {
          createdMuscleGroups.push(MuscleGroupFactory.from({name: muscleGroupName.trim()}));
        }
      });

    createdMuscleGroups.forEach(muscleGroup => {
      this.muscleGroups.push(muscleGroup);
    });

    return from([createdMuscleGroups]);
  }

  fetchMuscleGroups(): Observable<MuscleGroup[]> {
    return from([this.muscleGroups]);
  }

  newWorkout(): Observable<Workout> {
    return from([WorkoutFactory.fromRaw({
      id: WorkoutService.idCounter++,
      muscleGroups: []
    })]);
  }
}
