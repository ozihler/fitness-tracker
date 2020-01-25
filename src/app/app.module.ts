import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WorkoutSelectionComponent } from './workout-selection/workout-selection.component';
import { WorkoutsOverview } from './workouts-overview/workouts-overview.component';
import { WorkoutOverview } from './workout-overview/workout-overview.component';
import { CreateMuscleGroupComponent } from './create-muscle-group/create-muscle-group.component';
import { WorkoutDetailsView } from './muscle-group-display/workout-details-view.component';
import { MuscleGroupSelection } from './muscle-group-selection/muscle-group-selection.component';
import {ReactiveFormsModule} from "@angular/forms";
import { CreateExerciseComponent } from './create-exercise/create-exercise.component';
import { AddExerciseComponent } from './add-exercise/add-exercise.component';

@NgModule({
  declarations: [
    AppComponent,
    WorkoutSelectionComponent,
    WorkoutsOverview,
    WorkoutOverview,
    CreateMuscleGroupComponent,
    WorkoutDetailsView,
    MuscleGroupSelection,
    CreateExerciseComponent,
    AddExerciseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
