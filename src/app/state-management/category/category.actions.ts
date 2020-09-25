import {CategoryDto} from '../../commons/public-dto/category.dto';
import {CategoryModel} from '../../models/Categories/category.model';

export interface CategoryStateModel {
  categories: CategoryModel[];
}

export namespace CategoryActions {

  export class FetchAllCategories {
    static readonly type = '[Category] Fetch All Categories';

    constructor() {
    }
  }

  export class AddNewCategory {
    static readonly type = '[Category] Add New Category';

    constructor(public payload: CategoryDto) {
    }
  }

  export class FetchCategoryById {
    static readonly type = '[Category] Fetch Category By Id';

    constructor(public id: number) {
    }
  }


  export class UpdateCategory {
    static readonly type = '[Category] Update Category';

    constructor(public id: number, public updateCategoryDto: CategoryDto) {
    }
  }

  export class ClearCategory {
    static readonly type = '[Category] Clear Category';

    constructor() {
    }
  }
  export class DeleteCategory {
    static readonly type = '[Category] Delete Category';

    constructor(public id: number) {
    }
  }


}
