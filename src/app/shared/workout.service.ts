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

  static dummyData() {
    return WorkoutFactory.fromRaw({
      id: WorkoutService.idCounter++,
      muscleGroups: [
        MuscleGroupFactory.from({
          name: "Chest",
          exercises: [
            {
              name: "Bench Press",
              sets: [
                {repetitions: 12, weight: 50, waitingTime: 45},
                {repetitions: 12, weight: 40, waitingTime: 45},
                {repetitions: 12, weight: 40, waitingTime: 45}
              ]
            },
            {
              name: "Dumbbell Bench Press",
              sets: [
                {repetitions: 12, weight: 20, waitingTime: 45},
                {repetitions: 11, weight: 60, waitingTime: 45},
                {repetitions: 10, weight: 60, waitingTime: 45}
              ]
            },
            {
              name: "Flying Dumbbells",
              sets: [
                {repetitions: 12, weight: 65, waitingTime: 45},
                {repetitions: 12, weight: 60, waitingTime: 45},
                {repetitions: 10, weight: 60, waitingTime: 45}
              ]
            }
          ]
        }),
        MuscleGroupFactory.from({
          name: "Triceps",
          exercises: [
            {name: "Lat Pulldown"},
            {name: "Lat Low Overhead"},
            {name: "Inverted Dips"}
          ]
        }),
        MuscleGroupFactory.from({
          name: "Shoulders",
          exercises: [
            {name: "Arnold Press"},
            {name: "Combined Side Front"},
            {name: "Wide row"}
          ]
        })
      ]
    });
  }
}
