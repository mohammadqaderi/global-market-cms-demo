import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CategoriesComponent} from '../../pages/category/categories/categories.component';
import {CategoryDetailsComponent} from '../../pages/category/category-details/category-details.component';
import {RouterModule} from '@angular/router';
import {CategoriesLayoutRoutes} from './category-layout.routing';
import {SharedModule} from '../../shared/shared-global.module';
import {PipesModule} from '../../commons/pipes/pipes.module';


@NgModule({
  declarations: [CategoriesComponent,
    CategoryDetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(CategoriesLayoutRoutes),
    PipesModule
  ]
})
export class CategoryLayoutModule {
}
