import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MuscleGroupDisplayComponent } from './muscle-group-display.component';

describe('MuscleGroupDisplayComponent', () => {
  let component: MuscleGroupDisplayComponent;
  let fixture: ComponentFixture<MuscleGroupDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MuscleGroupDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MuscleGroupDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
