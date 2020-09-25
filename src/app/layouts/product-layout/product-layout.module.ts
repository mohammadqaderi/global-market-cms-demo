import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductsComponent} from '../../pages/product/products/products.component';
import {RouterModule} from '@angular/router';
import {ProductsLayoutRoutes} from './product-layout.routing';
import {SharedModule} from '../../shared/shared-global.module';
import {AddProductComponent} from '../../pages/product/add-product/add-product.component';
import {ManageProductImagesComponent} from '../../pages/product/manage-product-images/manage-product-images.component';
import {UpdateProductComponent} from '../../pages/product/update-product/update-product.component';
import {AddProductTagsComponent} from '../../pages/product/add-product-tags/add-product-tags.component';
import {RemoveProductTagsComponent} from '../../pages/product/remove-product-tags/remove-product-tags.component';


@NgModule({
  declarations: [
    ProductsComponent,
    AddProductComponent,
    ManageProductImagesComponent,
    AddProductTagsComponent,
    RemoveProductTagsComponent,
    UpdateProductComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ProductsLayoutRoutes),
    SharedModule
  ]
})
export class ProductLayoutModule {
}
