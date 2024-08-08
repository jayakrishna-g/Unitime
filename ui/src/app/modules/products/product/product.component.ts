import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { untilDestroyed } from '@ngneat/until-destroy';
import { ProductFormComponent } from '../product-form/product-form.component';
import { ProductService } from '../products-services/product-service.service';
export interface Customisation {
  price: number;
  quantity: string;
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
    public maximalLoad: number = 0,
    public classAssignment: string = '',
    public examAssignment: string = '',
    public ignoreTooFar: boolean = false,
    public department: string = ''
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

  constructor(
    private route: ActivatedRoute,
    public domSanitizer: DomSanitizer,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.product = this.route.snapshot.data.product;
  }

  productDetailsEdit(): void {
    console.log(this.product);
    this.dialog
      .open(ProductFormComponent, {
        data: this.product,
      })
      .afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe((res: Product) => {
        if (res) {
          this.product = res;
        }
      });
  }

  onEdit(): void {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDelete(): void {
    this.product.update();
  }

  onEditAssignment(): void {
    this.router.navigate(['edit-assignment'], { relativeTo: this.route });
  }
}
