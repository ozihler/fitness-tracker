import {Component, Input, OnInit} from '@angular/core';
import {MuscleGroup} from "../shared/muscle-group";

@Component({
  selector: 'app-muscle-group-display',
  template: `
    <button routerLink="/add-exercise"
            *ngFor="let muscleGroup of selectedMuscleGroups">{{muscleGroup.name}}</button> `,
  styles: []
})
export class MuscleGroupDisplayComponent implements OnInit {

  @Input() selectedMuscleGroups: MuscleGroup[] = [];

  constructor() {
  }

  ngOnInit() {
  }

}
