import {ProductModel} from '../../models/Products/product.model';
import {UpdateProductDto} from '../../commons/public-dto/update-product.dto';

export interface ProductStateModel {
  products: ProductModel[];
}

export namespace ProductActions {
  export class FetchAllProducts {
    static readonly type = '[Product] Fetch User Products';

    constructor() {
    }
  }

  export class FetchProductsByTagName {
    static readonly type = '[Product] Fetch Products By Tag Name';

    constructor(public tagName: string) {
    }
  }

  export class FetchProductById {
    static readonly type = '[Product] Fetch Product By Id';

    constructor(public id: number) {
    }
  }

  export class FetchFilteredProductsByRange {
    static readonly type = '[Product] Fetch Filtered Products By Range';

    constructor(public range1: number, public range2: number) {
    }
  }

  export class FetchProductsByStockExistence {
    static readonly type = '[Product] Fetch Products By Stock Existence';

    constructor(public stock: boolean) {
    }
  }

  export class ManageProductImages {
    static readonly type = '[Product] Manage Product Images';

    constructor(public id: number, public formImages: any,
                public type: string) {
    }
  }

  export class AddToCart {
    static readonly type = '[Product] Add To Cart';

    constructor(public productId: number, public cartId: number) {
    }
  }

  export class AddTagsToProduct {
    static readonly type = '[Product] Add Tags To Product';

    constructor(public id: number, public payload: { tags: number[] }) {
    }
  }

  export class RemoveTagsFromProduct {
    static readonly type = '[Product] Remove Tags From Product';

    constructor(public id: number, public payload: { tags: number[] }) {
    }
  }

  export class UpdateProduct {
    static readonly type = '[Product] Update Product';

    constructor(public id: number, public updateProductDto: UpdateProductDto) {
    }
  }

  export class AddProduct {
    static readonly type = '[Product] Add Product';

    constructor(public data: ProductModel) {
    }
  }

  export class DeleteSubCategoryProducts {
    static readonly type = '[Product] Delete SubCategory Products';

    constructor(public subCategoryId: number) {
    }
  }

  export class AddNewProduct {
    static readonly type = '[Product] Add New Product';

    constructor(public id: number, public formData: any, public type: string) {
    }
  }

  export class ClearProducts {
    static readonly type = '[Product] Clear Products';

    constructor() {
    }
  }

  export class DeleteProduct {
    static readonly type = '[Product] Delete Product';

    constructor(public id: number) {
    }
  }
}
