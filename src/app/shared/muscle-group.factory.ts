import {MuscleGroupRaw} from "./muscle-group-raw";
import {MuscleGroup} from "./muscle-group";

export class MuscleGroupFactory {

  static from(muscleGroupRaw: MuscleGroupRaw): MuscleGroup {
    return {
      ...muscleGroupRaw
    }
  }
}
