import { Component, OnInit } from '@angular/core';
import { Product } from '../product/product.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../products-services/product-service.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
  product!: Product;
  productForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private productService: ProductService,
    private toaster: ToastrService
  ) {
    this.product = this.route.snapshot.data.product;
  }

  createProductForm() {
    this.productForm = this.formBuilder.group({
      name: [this.product.name || '', Validators.required],
      externalId: [this.product.externalId || ''],
      position: [this.product.position || ''],
      note: [this.product.note || ''],
      preferenceTime: [this.product.preferenceTime || ''],
      roomDistribution: [this.product.roomDistribution || ''],
      course: [this.product.course || []],
      teachingPreference: [this.product.teachingPreference || []],
      // maximalLoad: [this.product.maximalLoad || 0],
      // classAssignment: [this.product.classAssignment || ''],
      // examAssignment: [this.product.examAssignment || ''],
      // ignoreTooFar: [this.product.ignoreTooFar || false],
      department: [this.product.department || ''],
      role: [this.product.role || ''],
    });
  }

  ngOnInit(): void {
    this.createProductForm();
  }

  update() {
    if (this.productForm.valid) {
      this.product = { ...this.product, ...this.productForm.value };
      this.productService.updateProduct(this.product).subscribe((res) => {
        console.log(res);
        this.toaster.success('Product Updated Successfully');
        this.router.navigate(['../'], { relativeTo: this.route });
      });
    }
  }

  back() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
