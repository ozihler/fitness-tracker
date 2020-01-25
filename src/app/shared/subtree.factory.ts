import {MuscleGroup} from "./muscle-group";
import {ButtonNode} from "../workout-details-view/button-group/button-node";
import {Exercise} from "./exercise";
import {Set} from "./set"

export class SubtreeFactory {
  // todo: handle calls from x + E buttons

  static from(muscleGroup: MuscleGroup): ButtonNode {
    return new ButtonNode(
      muscleGroup.name,
      SubtreeFactory.formatExercises(muscleGroup.exercises),
      1);
  }

  private static formatExercises(exercises: Exercise[]) {
    if (!exercises) {
      return [];
    }
    return exercises.map(e => new ButtonNode(e.name, SubtreeFactory.formatSets(e.sets), 2));

  }

  private static formatSets(sets: Set[]) {
    if (!sets) {
      return [];
    }
    return sets
      .map(s => {
        return new ButtonNode(`${s.repetitions}[reps]|${s.weight}[kg]|${s.waitingTime}[s]`, [], 3);
      });
  }
}
