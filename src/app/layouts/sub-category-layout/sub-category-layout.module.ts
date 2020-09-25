import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SubCategoriesComponent} from '../../pages/sub-category/sub-categories/sub-categories.component';
import {SubCategoryDetailsComponent} from '../../pages/sub-category/sub-category-details/sub-category-details.component';
import {RouterModule} from '@angular/router';
import {SubCategoriesLayoutRoutes} from './sub-category-layout.routing';
import {SharedModule} from '../../shared/shared-global.module';
import {AddSubCategoryTagsComponent} from '../../pages/sub-category/add-sub-category-tags/add-sub-category-tags.component';
import {AddSubCategoryComponent} from '../../pages/sub-category/add-sub-category/add-sub-category.component';
import {RemoveSubCategoryTagsComponent} from '../../pages/sub-category/remove-sub-category-tags/remove-sub-category-tags.component';
import {UpdateSubCategoryComponent} from '../../pages/sub-category/update-sub-category/update-sub-category.component';


@NgModule({
  declarations: [
    SubCategoriesComponent,
    SubCategoryDetailsComponent,
    AddSubCategoryTagsComponent,
    AddSubCategoryComponent,
    RemoveSubCategoryTagsComponent,
    UpdateSubCategoryComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(SubCategoriesLayoutRoutes)
  ]
})
export class SubCategoryLayoutModule {
}
