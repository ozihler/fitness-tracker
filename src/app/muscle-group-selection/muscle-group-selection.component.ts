import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MuscleGroup} from "../shared/muscle-group";

@Component({
  selector: 'app-muscle-group-selection',
  template: `
    <div>
      <div>
        <button
          (click)="select(muscleGroup)"
          *ngFor="let muscleGroup of muscleGroups">{{muscleGroup.name}}</button>
      </div>
    </div>  `,
  styles: []
})
export class MuscleGroupSelection implements OnInit {

  @Input() muscleGroups: MuscleGroup[];
  @Output() selectMuscleGroup = new EventEmitter<MuscleGroup>();

  constructor() {
  }

  ngOnInit() {
  }

  select(muscleGroup: MuscleGroup) {
    this.selectMuscleGroup.emit(muscleGroup);
  }
}
