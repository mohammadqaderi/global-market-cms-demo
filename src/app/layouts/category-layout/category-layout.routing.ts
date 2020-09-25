import {Routes} from '@angular/router';
import {CategoriesComponent} from '../../pages/category/categories/categories.component';
import {CategoryDetailsComponent} from '../../pages/category/category-details/category-details.component';

export const CategoriesLayoutRoutes: Routes = [
  {
    path: 'categories',
    component: CategoriesComponent
  },
  {
    path: 'categories/:id',
    component: CategoryDetailsComponent
  }
];
