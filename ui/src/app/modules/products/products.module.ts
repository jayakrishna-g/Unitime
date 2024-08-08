import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products/products.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductComponent } from './product/product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { EditAssignmentPrefComponent } from './edit-assignment-pref/edit-assignment-pref.component';
import { TimePreferencesComponent } from './time-preferences/time-preferences.component';

@NgModule({
  declarations: [ProductsComponent, ProductFormComponent, ProductComponent, EditProductComponent, EditAssignmentPrefComponent, TimePreferencesComponent],
  imports: [CommonModule, ProductsRoutingModule, SharedModule.forRoot()],
  exports: [],
})
export class ProductsModule {}
