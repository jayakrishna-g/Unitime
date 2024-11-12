import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { untilDestroyed } from '@ngneat/until-destroy';
import { ProductFormComponent } from '../product-form/product-form.component';
import { ProductService } from '../products-services/product-service.service';
import { BehaviorSubject } from 'rxjs';
export interface Customisation {
  price: number;
  quantity: string;
}

type GenricPref = {
  key: string;
  value: string;
};
export interface SemesterPreference {
  preferenceTime: string;
  roomDistribution: GenricPref[];
  course: GenricPref[];
}
export class Product {
  constructor(
    public name: string,
    public user: string = '',
    public _id: string = '',
    public externalId: string = '',
    public position: string = '',
    public note: string = '',
    public preferenceTime: string = '',
    public roomDistribution: string = '',
    public course: string[] = [],
    public teachingPreference: boolean[] = [],
    public classAssignment: string = '',
    // public examAssignment: string = '',
    public department: string = '',
    public email: string = '', //public semester: string[] = ['Fall-2024', 'Spring-2025', 'Fall-2025', 'Spring-2026']
    public semester: string = '', // public semesterPreference: { [key: string]: {} } = {}
    public semesterPreference: { [key: string]: SemesterPreference } = {},
    public role: string = ''
  ) {}

  private updateInServer(options: any) {
    try {
      fetch('/api/', options);
    } catch (err) {
      this.updateInServer(options);
    }
  }
  update() {
    const options = {
      method: 'POST',
      body: JSON.stringify(this),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    this.updateInServer(options);
  }
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  product!: Product;

  semesters = ['Fall-2024', 'Spring-2025', 'Fall-2025', 'Spring-2026'];
  //semesters: string[] = [];
  selected_semester = this.semesters[0];
  roomDistribution: GenricPref[] = [{ key: '', value: '' }];
  coursePref: GenricPref[] = [{ key: '', value: '' }];
  preferences = new BehaviorSubject<string>('');
  constructor(
    private route: ActivatedRoute,
    public domSanitizer: DomSanitizer,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.product = this.route.snapshot.data.product;
    this.roomDistribution = this.product.semesterPreference[this.selected_semester].roomDistribution;
    this.coursePref = this.product.semesterPreference[this.selected_semester].course;
    //this.semesters = Object.keys(this.product.semesterPreference);
    this.preferences.next(this.product.semesterPreference[this.selected_semester].preferenceTime);
    console.log(this.semesters);
  }

  onEdit(): void {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onSemesterChange(event: any): void {
    console.log(event);
    if (this.product.semesterPreference[event] === undefined) {
      this.preferences.next(' ');
      this.roomDistribution = [{ key: '', value: '' }];
      this.coursePref = [{ key: '', value: '' }];
    } else {
      this.preferences.next(this.product.semesterPreference[event].preferenceTime);
      this.coursePref = this.product.semesterPreference[event].course;
      this.roomDistribution = this.product.semesterPreference[event].roomDistribution;
    }
  }
  onEditAssignment(): void {
    this.router.navigate(['edit-assignment'], { relativeTo: this.route });
  }
}
