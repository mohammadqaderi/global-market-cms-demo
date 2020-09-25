import {AbstractProduct} from '../../commons/classes/abstract-product';
import {ProductTagModel} from './product-tag.model';

export class ProductModel extends AbstractProduct {

  images: string[];

  description: string;

  references: number[];

  inStock: boolean;

  price: number;

  productTags: ProductTagModel[];

  createdAt: Date;

  updatedAt: Date;

  subCategoryId: number;
}
