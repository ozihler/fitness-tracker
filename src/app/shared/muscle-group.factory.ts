import {MuscleGroupRaw} from "./muscle-group-raw";
import {MuscleGroup} from "./muscle-group";
import {ExerciseFactory} from "./ExerciseFactory";

export class MuscleGroupFactory {

  static from(muscleGroupRaw: MuscleGroupRaw): MuscleGroup {
    return {
      ...muscleGroupRaw,
      exercises: muscleGroupRaw.exercises
        ? muscleGroupRaw.exercises.map(e => ExerciseFactory.from(e))
        : undefined
    }
  }
}
