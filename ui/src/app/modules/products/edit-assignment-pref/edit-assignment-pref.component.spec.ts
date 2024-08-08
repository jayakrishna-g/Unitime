import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAssignmentPrefComponent } from './edit-assignment-pref.component';

describe('EditAssignmentPrefComponent', () => {
  let component: EditAssignmentPrefComponent;
  let fixture: ComponentFixture<EditAssignmentPrefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditAssignmentPrefComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAssignmentPrefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
