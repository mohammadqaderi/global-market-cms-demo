import {Pipe, PipeTransform} from '@angular/core';
import {CategoryModel} from '../../models/Categories/category.model';

@Pipe({
  name: 'categoriesFilter'
})
export class CategoryPipe implements PipeTransform {

  transform(categories: CategoryModel[], searchTerm: string): CategoryModel[] {
    if (!categories || !searchTerm) {
      return categories;
    }
    return categories.filter(category =>
      category.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)
  }

}
