import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../product/product.component';
import { ProductService } from '../products-services/product-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  productForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public domSanitizer: DomSanitizer,
    private productService: ProductService,
    private toaster: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createProductForm();
  }

  createProductForm() {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      externalId: [''],
      position: [''],
      note: [''],
      preferenceTime: [''],
      roomDistribution: [''],
      course: [[]],
      teachingPreference: [[]],
      maximalLoad: [0],
      classAssignment: [''],
      examAssignment: [''],
      ignoreTooFar: [false],
      department: [''],
    });
  }

  // onFileSelected(event: any) {
  //   const fileList: FileList = event.target.files;
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     this.productForm.get('icon')?.setValue(reader.result);
  //     console.log(this.productForm.value);
  //   };
  //   if (fileList && fileList[0]) {
  //     reader.readAsDataURL(fileList[0]);
  //   }
  // }

  update() {
    if (this.productForm.valid) {
      this.productService.createProduct(this.productForm.value).subscribe(
        () => {
          this.toaster.success('Updated Product Successfully');
        },
        () => {
          this.toaster.error('Failed to Update Product');
        }
      );
    }
  }
  back() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
