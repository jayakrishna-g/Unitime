import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product/product.component';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { ProductService } from '../products-services/product-service.service';

type GenricPref = {
  key: string;
  value: string;
};

let distributionPrefOptions = [
  'At Least One Hour Between Classes',
  'At Least 1 Hour Between',
  'At Most 5 Hours A Day',
  'At Most 6 Hours A Day',
  'At Most 7 Hours A Day',
  'At Most 8 Hours A Day',
  'Back-To-Back',
  'Back-To-Back & Same Room',
  'Less Than 6 Hours Between',
  'Minimize Number Of Rooms Used',
  'Same Days',
  'Same Room',
];

let coursePrefOptions = [
  'ACT 201 - Intro to Acturial Science',
  'ACT 202 - Acturial Science II',
  'ACT 301 - Acturial Science III',
  'ACT 401 - Acturial Science IV',
  'ACT 501 - Acturial Science V',
  'ACT 601 - Acturial Science VI',
  'ACT 701 - Acturial Science VII',
  'ACT 801 - Acturial Science VIII',
  'ACT 901 - Acturial Science IX',
  'ACT 1001 - Acturial Science X',
];

@Component({
  selector: 'app-edit-assignment-pref',
  templateUrl: './edit-assignment-pref.component.html',
  styleUrls: ['./edit-assignment-pref.component.scss'],
})
export class EditAssignmentPrefComponent implements OnInit {
  product!: Product;
  preferences = new BehaviorSubject<string>('');
  distributionPref = new BehaviorSubject<GenricPref[]>([{ key: '', value: '' }]);
  distributionPrefOptions = distributionPrefOptions;
  coursePrefOptions = coursePrefOptions;
  coursePref = new BehaviorSubject<GenricPref[]>([{ key: '', value: '' }]);
  constructor(
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.product = this.route.snapshot.data.product;
    this.preferences.next(this.product.preferenceTime);
    this.coursePref.next(this.coursePref_fromString(this.product.classAssignment));
    this.distributionPref.next(this.distributionref_fromString(this.product.roomDistribution));
  }

  getUserName(): string {
    return this.authService.getTokenData().businessName;
  }

  update() {
    this.product.preferenceTime = this.preferences.value;
    this.product.roomDistribution = this.distributionPref_toString();
    this.product.course = this.coursePref.value.map((pref) => pref.key);
    this.product.classAssignment = this.coursePref_toString();
    console.log(this.product);
    this.productService.updateProduct(this.product).subscribe((res) => {
      console.log(res);
    });
  }

  back() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  updatePreferences(preferences: string) {
    this.product.preferenceTime = preferences;
    console.log(this.product);
    this.preferences.next(preferences);
  }

  addDistributionPref() {
    this.distributionPref.next([...this.distributionPref.value, { key: '', value: '' }]);
  }
  addCoursePref() {
    this.coursePref.next([...this.coursePref.value, { key: '', value: '' }]);
  }

  distributionPref_toString(): string {
    return this.distributionPref.value.map((pref) => `${pref.key}---${pref.value}`).join(', ');
  }

  coursePref_toString(): string {
    return this.coursePref.value.map((pref) => `${pref.key}---${pref.value}`).join(', ');
  }

  distributionref_fromString(prefString: string): GenricPref[] {
    return prefString.split(', ').map((pref) => {
      const [key, value] = pref.split('---');
      return { key, value };
    });
  }

  coursePref_fromString(prefString: string): GenricPref[] {
    return prefString.split(', ').map((pref) => {
      const [key, value] = pref.split('---');
      return { key, value };
    });
  }
}
