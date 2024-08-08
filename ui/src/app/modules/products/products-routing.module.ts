import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductResolver } from '../resolvers/product.resolver';
import { ProductsResolver } from '../resolvers/products.resolver';
import { ProductComponent } from './product/product.component';
import { ProductsComponent } from './products/products.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { EditAssignmentPrefComponent } from './edit-assignment-pref/edit-assignment-pref.component';

const routes: Routes = [
  { path: '', component: ProductsComponent, resolve: { products: ProductsResolver } },
  {
    path: 'new',
    component: ProductFormComponent,
  },
  {
    path: ':id',
    component: ProductComponent,
    resolve: { product: ProductResolver },
  },
  {
    path: ':id/edit',
    component: EditProductComponent,
    resolve: { product: ProductResolver },
  },
  {
    path: ':id/edit-assignment',
    component: EditAssignmentPrefComponent,
    resolve: { product: ProductResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
