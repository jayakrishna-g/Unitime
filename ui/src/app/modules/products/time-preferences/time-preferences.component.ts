import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-time-preferences',
  templateUrl: './time-preferences.component.html',
  styleUrls: ['./time-preferences.component.scss'],
})
export class TimePreferencesComponent implements OnInit, OnChanges {
  @Input() preferences!: string;
  @Output() preferencesChange = new EventEmitter<string>();
  @Input() disableClick!: boolean;
  @Input() standalone!: boolean;

  timeIntervals = [
    '7.30a-8.00a',
    '8.00a-8.30a',
    '8.30a-9.00a',
    '9.00a-9.30a',
    '9.30a-10.00a',
    '10.00a-10.30a',
    '10.30a-11.00a',
    '11.00a-11.30a',
    '11.30a-12.00p',
    '12.00p-12.30p',
    '12.30p-1.00p',
    '1.00p-1.30p',
    '1.30p-2.00p',
    '2.00p-2.30p',
    '2.30p-3.00p',
    '3.00p-3.30p',
    '3.30p-4.00p',
    '4.00p-4.30p',
    '4.30p-5.00p',
    '5.00p-5.30p',
    '5.30p-6.00p',
    '6.00p-6.30p',
  ];

  days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

  states: { [key: number]: string } = {
    0: 'NA',
    1: 'Strongly Preferred',
    2: 'Preferred',
    3: 'Neutral',
    4: 'Discouraged',
    5: 'Strongly Discouraged',
    6: 'Prohibited',
  };

  reverse_states: { [key: string]: number } = {
    NA: 0,
    'Strongly Preferred': 1,
    Preferred: 2,
    Neutral: 3,
    Discouraged: 4,
    'Strongly Discouraged': 5,
    Prohibited: 6,
  };

  availability_matrix = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  to_string() {
    let res = '';
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 22; j++) {
        res += this.states[this.availability_matrix[i][j]];
        if (j < 21) {
          res += ', ';
        }
      }
      if (i < 4) {
        res += '\n';
      }
    }
    return res;
  }

  from_string(str: string) {
    let lines = str.split('\n');
    for (let i = 0; i < 5; i++) {
      let states = lines[i].split(', ');
      for (let j = 0; j < 22; j++) {
        this.availability_matrix[i][j] = this.reverse_states[states[j]];
      }
    }
  }

  is_valid(str: string) {
    console.log(str);
    let lines = str.split('\n');
    if (lines.length != 5) {
      return false;
    }
    for (let i = 0; i < 5; i++) {
      let states = lines[i].split(', ');
      if (states.length != 22) {
        return false;
      }
      for (let j = 0; j < 22; j++) {
        if (parseInt(states[j]) < 0 || parseInt(states[j]) > 6) {
          return false;
        }
      }
    }
    return true;
  }

  constructor() {}

  ngOnInit(): void {
    if (this.is_valid(this.preferences)) {
      console.log('valid');
      this.from_string(this.preferences);
    }
    console.log('preferences');
    console.log(this.preferences);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (changes.preferences) {
      if (this.is_valid(changes.preferences.currentValue)) {
        console.log('valid');
        this.from_string(changes.preferences.currentValue);
      } else {
        this.availability_matrix = [
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ];
      }
    }
  }

  cellClick(i: number, j: number) {
    if (this.disableClick) {
      return;
    }
    this.availability_matrix[i][j] = (this.availability_matrix[i][j] + 1) % 7;
    this.preferences = this.to_string();
    // console.log(this.preferences);
    this.preferencesChange.emit(this.preferences);
  }
}
