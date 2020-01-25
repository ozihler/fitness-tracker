import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutDetailsView } from './workout-details-view.component';

describe('WorkoutDetailsViewComponent', () => {
  let component: WorkoutDetailsView;
  let fixture: ComponentFixture<WorkoutDetailsView>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkoutDetailsView ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutDetailsView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
