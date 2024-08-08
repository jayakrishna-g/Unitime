import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Layout } from 'src/app/shared/components/layout/layout.component';
import { Product } from '../product/product.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  displayedColumns: string[] = [
    'name',
    'externalId',
    'position',
    'roomDistribution',
    'course',
    'teachingPreference',
    'maximalLoad',
    'classAssignment',
    'examAssignment',
    'ignoreTooFar',
  ];
  dataSource = new MatTableDataSource(this.products);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private route: ActivatedRoute, public domSanitizer: DomSanitizer, private router: Router) {
    this.products = this.route.snapshot.data.products;
    this.dataSource = new MatTableDataSource(this.products);
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onDelete(product: Product) {}

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
