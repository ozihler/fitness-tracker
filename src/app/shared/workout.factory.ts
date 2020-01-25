import {WorkoutRaw} from "./WorkoutRaw";
import {Workout} from "./workout";
import {MuscleGroupFactory} from "./muscle-group.factory";

export class WorkoutFactory {
  static fromRaw(workoutRaw: WorkoutRaw): Workout {
    return {
      ...workoutRaw,
      muscleGroups: workoutRaw.muscleGroups.map(muscleGroup => MuscleGroupFactory.from(muscleGroup))

    }
  }
}
