import {AbstractCategory} from '../../commons/classes/abstract-category';
import {ProductModel} from '../Products/product.model';
import {SubCategoryTagModel} from './sub-category-tag.model';

export class SubCategoryModel extends AbstractCategory {
  products: ProductModel[];

  subCategoryTags: SubCategoryTagModel[];

  categoryId: number;

  references: number[];
}
