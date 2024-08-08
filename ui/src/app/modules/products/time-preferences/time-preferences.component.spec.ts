import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimePreferencesComponent } from './time-preferences.component';

describe('TimePreferencesComponent', () => {
  let component: TimePreferencesComponent;
  let fixture: ComponentFixture<TimePreferencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimePreferencesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimePreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
