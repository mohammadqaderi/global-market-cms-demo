import {SubCategoryModel} from '../../models/Categories/sub-category.model';
import {SubCategoryDto} from '../../commons/public-dto/category.dto';

export interface SubCategoryStateModel {
  subCategories: SubCategoryModel[];
}

export namespace SubCategoryActions {
  export class FetchAllSubCategories {
    static readonly type = '[SubCategory] Fetch All Sub Categories';

    constructor() {
    }
  }

  export class FetchSubCategoryById {
    static readonly type = '[SubCategory] Fetch SubCategory By Id';

    constructor(public id: number) {
    }
  }

  export class FetchSubCategoriesByTagName {
    static readonly type = '[SubCategory] Fetch SubCategories By Tag Name';

    constructor(public tagName: string) {
    }
  }


  export class AddNewSubCategory {
    static readonly type = '[SubCategory] Add New Sub Category';

    constructor(public id: number, public createCategoryDto: SubCategoryDto) {
    }
  }

  export class UpdateSubCategory {
    static readonly type = '[SubCategory] Update SubCategory';

    constructor(public id: number, public updateSubCategoryDto: SubCategoryDto) {
    }
  }

  export class DeleteSubCategory {
    static readonly type = '[SubCategory] Delete SubCategory';

    constructor(public id: number) {
    }
  }

  export class RemoveSubCategoriesAssociatedWithCategory {
    static readonly type = '[SubCategory] Remove SubCategories Associated With Category';
    constructor(public categoryId: number) {
    }
  }

  export class RemoveProductFromSubCategory {
    static readonly type = '[SubCategory] Remove Product From SubCategory';

    constructor(public subCategoryId: number, public productId: number) {
    }
  }

  export class AddTagsToSubCategory {
    static readonly type = '[SubCategory] Add Tags To SubCategory';

    constructor(public id: number, public payload: { tags: number[] }) {
    }
  }

  export class ClearSubCategory {
    static readonly type = '[SubCategory] Clear SubCategory';

    constructor() {
    }
  }

  export class RemoveTagsFromSubCategory {
    static readonly type = '[SubCategory] Remove Tags From SubCategory';

    constructor(public id: number, public payload: { tags: number[] }) {
    }
  }
}
