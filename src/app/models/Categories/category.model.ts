import {AbstractCategory} from '../../commons/classes/abstract-category';
import {SubCategoryModel} from './sub-category.model';

export class CategoryModel extends AbstractCategory {
  subCategories: SubCategoryModel[];
}
