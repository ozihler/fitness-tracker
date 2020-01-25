import {MuscleGroup} from "./muscle-group";

export interface Workout {
  id: number;
  muscleGroups: MuscleGroup[];
}
