import {Routes} from '@angular/router';
import {SubCategoriesComponent} from '../../pages/sub-category/sub-categories/sub-categories.component';
import {SubCategoryDetailsComponent} from '../../pages/sub-category/sub-category-details/sub-category-details.component';

export const SubCategoriesLayoutRoutes: Routes = [
  {
    path: 'sub-categories',
    component: SubCategoriesComponent
  },
  {
    path: 'sub-categories/:id',
    component: SubCategoryDetailsComponent
  }
];
