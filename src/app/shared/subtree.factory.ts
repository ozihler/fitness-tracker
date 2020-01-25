import {MuscleGroup} from "./muscle-group";
import {ButtonNode} from "../workout-details-view/button-group/button-node";
import {Exercise} from "./exercise";
import {Set} from "./set"
import {Id} from "./id";

export class SubtreeFactory {
  // todo: handle calls from x + E buttonsK

  static from(muscleGroup: MuscleGroup): ButtonNode {
    return new ButtonNode(
      Id.from(muscleGroup.name),
      muscleGroup.name,
      SubtreeFactory.formatExercises(muscleGroup.exercises),
      1);
  }

  private static formatExercises(exercises: Exercise[]) {
    if (!exercises) {
      return [];
    }
    return exercises.map(e => new ButtonNode(Id.from(e.name), e.name, SubtreeFactory.formatSets(e.name, e.sets), 2));
  }

  private static formatSets(exerciseName: string, sets: Set[]) {
    if (!exerciseName || !sets) {
      return [];
    }
    return sets
      .map((s, index) => {
        return new ButtonNode(Id.from(exerciseName + "_" + index), `${s.repetitions}[reps]|${s.weight}[kg]|${s.waitingTime}[s]`, [], 3);
      });
  }
}
