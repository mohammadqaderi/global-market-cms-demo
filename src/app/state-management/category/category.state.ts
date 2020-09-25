import {Action, Selector, State, StateContext, Store} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {tap} from 'rxjs/operators';
import {CategoryActions, CategoryStateModel} from './category.actions';
import {CategoryService} from '../../services/category/category.service';
import FetchAllCategories = CategoryActions.FetchAllCategories;
import {CategoryModel} from '../../models/Categories/category.model';
import AddNewCategory = CategoryActions.AddNewCategory;
import {append, patch, removeItem, updateItem} from '@ngxs/store/operators';
import UpdateCategory = CategoryActions.UpdateCategory;
import DeleteCategory = CategoryActions.DeleteCategory;
import ClearCategory = CategoryActions.ClearCategory;
import {SubCategoryActions} from '../sub-category/sub-category.actions';
import RemoveSubCategoriesAssociatedWithCategory = SubCategoryActions.RemoveSubCategoriesAssociatedWithCategory;


@State<CategoryStateModel>({
  name: 'categories',
  defaults: {
    categories: null
  }
})
@Injectable()
export class CategoryState {
  constructor(private categoryService: CategoryService, private store: Store) {
  }

  @Selector()
  static Categories(state: CategoryStateModel) {
    return state.categories;
  }

  @Action(FetchAllCategories)
  fetchAllCategories(ctx: StateContext<CategoryStateModel>, action: FetchAllCategories) {
    return this.categoryService.getAllCategories().pipe(
      tap((categories: CategoryModel[]) => {
        ctx.setState({
          categories
        });
      })
    );
  }

  @Action(AddNewCategory)
  addNewCategory(ctx: StateContext<CategoryStateModel>, action: AddNewCategory) {
    return this.categoryService.addNewCategory(action.payload).pipe(
      tap((category: CategoryModel) => {
        ctx.setState(
          patch({
            categories: append<CategoryModel>([category])
          })
        );
      })
    );
  }

  private getCloneCategory(id: number) {
    return Object.assign({}, this.store.selectSnapshot(CategoryState.Categories)
      .find(category => category.id === id));
  }

  @Action(UpdateCategory)
  updateCategory(ctx: StateContext<CategoryStateModel>, action: UpdateCategory) {
    return this.categoryService.updateCategory(action.id, action.updateCategoryDto).pipe(
      tap((updatedCategory: CategoryModel) => {
        ctx.setState(
          patch({
            categories: updateItem<CategoryModel>(category => category.id === action.id, updatedCategory)
          })
        );
      })
    );
  }

  @Action(ClearCategory)
  clearCategories(ctx: StateContext<CategoryStateModel>, action: ClearCategory) {
    ctx.setState({
      categories: null
    });
  }

  @Action(DeleteCategory)
  deleteCategory(ctx: StateContext<CategoryStateModel>, action: DeleteCategory) {
    return this.categoryService.deleteCategory(action.id).pipe(
      tap(() => {
        ctx.setState(
          patch({
            categories: removeItem<CategoryModel>(category => category.id === action.id)
          })
        );
        this.store.dispatch(new RemoveSubCategoriesAssociatedWithCategory(action.id));
      })
    );
  }


}
