import {Action, Selector, State, StateContext, Store} from '@ngxs/store';
import {SubCategoryActions, SubCategoryStateModel} from './sub-category.actions';
import {Injectable} from '@angular/core';
import {SubCategoryService} from '../../services/category/sub-category.service';
import FetchAllSubCategories = SubCategoryActions.FetchAllSubCategories;
import {tap} from 'rxjs/operators';
import {SubCategoryModel} from '../../models/Categories/sub-category.model';
import {append, patch, removeItem, updateItem} from '@ngxs/store/operators';
import AddTagsToSubCategory = SubCategoryActions.AddTagsToSubCategory;
import {SubCategoryTagModel} from '../../models/Categories/sub-category-tag.model';
import RemoveTagsFromSubCategory = SubCategoryActions.RemoveTagsFromSubCategory;
import {ProductActions} from '../product/product.actions';
import UpdateSubCategory = SubCategoryActions.UpdateSubCategory;
import DeleteSubCategory = SubCategoryActions.DeleteSubCategory;
import DeleteSubCategoryProducts = ProductActions.DeleteSubCategoryProducts;
import RemoveProductFromSubCategory = SubCategoryActions.RemoveProductFromSubCategory;
import ClearSubCategory = SubCategoryActions.ClearSubCategory;
import AddNewSubCategory = SubCategoryActions.AddNewSubCategory;
import {CategoryService} from '../../services/category/category.service';
import RemoveSubCategoriesAssociatedWithCategory = SubCategoryActions.RemoveSubCategoriesAssociatedWithCategory;


@State<SubCategoryStateModel>({
  name: 'subCategories',
  defaults: {
    subCategories: null
  }
})
@Injectable()
export class SubCategoryState {
  constructor(private subCategoryService: SubCategoryService, private categoryService: CategoryService,
              private store: Store) {
  }

  @Selector()
  static SubCategories(state: SubCategoryStateModel) {
    return state.subCategories;
  }

  @Action(FetchAllSubCategories)
  fetchAllSubCategories(ctx: StateContext<SubCategoryStateModel>, action: FetchAllSubCategories) {
    return this.subCategoryService.getAllSubCategories().pipe(
      tap((data: SubCategoryModel[]) => {
        ctx.setState({
          subCategories: data
        });
      })
    );
  }

  getCloneSubCategory(id: number) {
    return Object.assign({},
      this.store.selectSnapshot(SubCategoryState.SubCategories).find(sub => sub.id === id));
  }


  @Action(UpdateSubCategory)
  updateSubCategory(ctx: StateContext<SubCategoryStateModel>, action: UpdateSubCategory) {
    return this.subCategoryService.updateSubCategory(action.id, action.updateSubCategoryDto).pipe(
      tap((subCategoryModel: SubCategoryModel) => {
        ctx.setState(patch({
          subCategories: updateItem<SubCategoryModel>(sub => sub.id === action.id, subCategoryModel)
        }));
      })
    );
  }

  @Action(DeleteSubCategory)
  deleteSubCategory(ctx: StateContext<SubCategoryStateModel>, action: DeleteSubCategory) {
    return this.subCategoryService.deleteSubCategory(action.id).pipe(
      tap(() => {
        ctx.setState(patch({
          subCategories: removeItem<SubCategoryModel>(sub => sub.id === action.id)
        }));
        this.store.dispatch(new DeleteSubCategoryProducts(action.id));
      })
    );
  }

  @Action(RemoveProductFromSubCategory)
  removeProductFromSubCategory(ctx: StateContext<SubCategoryStateModel>, action: RemoveProductFromSubCategory) {
    const subCategory = this.getCloneSubCategory(action.subCategoryId);
    subCategory.products = subCategory.products.filter(prod => prod.id !== action.productId);
    ctx.setState(patch({
      subCategories: updateItem<SubCategoryModel>(sub => sub.id === action.subCategoryId, subCategory)
    }));
  }

  @Action(AddTagsToSubCategory)
  addTagsToSubCategory(ctx: StateContext<SubCategoryStateModel>, action: AddTagsToSubCategory) {
    return this.subCategoryService.addTagsToSubCategory(action.id, action.payload).pipe(
      tap((addedSubCategoryTags: SubCategoryTagModel[]) => {
        const subCategory = this.getCloneSubCategory(action.id);
        for (let i = 0; i < addedSubCategoryTags.length; i++) {
          subCategory.subCategoryTags = [...subCategory.subCategoryTags, addedSubCategoryTags[i]];
        }
        ctx.setState(patch({
          subCategories: updateItem<SubCategoryModel>(sub => sub.id === action.id, subCategory)
        }));
      })
    );
  }

  @Action(RemoveSubCategoriesAssociatedWithCategory)
  removeSubCategoriesAssociatedWithCategory(ctx: StateContext<SubCategoryStateModel>,
                                            action: RemoveSubCategoriesAssociatedWithCategory) {
    const subCategories = this.store.selectSnapshot(SubCategoryState.SubCategories);
    for (let i = 0; i < subCategories.length; i++) {
      if (subCategories[i].categoryId === action.categoryId) {
        ctx.setState(patch({
          subCategories: removeItem<SubCategoryModel>(sub => sub.id === subCategories[i].id)
        }));
        this.store.dispatch(new DeleteSubCategoryProducts(subCategories[i].id));
      }
    }
  }

  @Action(AddNewSubCategory)
  addNewSubCategory(ctx: StateContext<SubCategoryStateModel>, action: AddNewSubCategory) {
    return this.categoryService.addNewSubCategory(action.id, action.createCategoryDto).pipe(
      tap((subCategory: SubCategoryModel) => {
        ctx.setState(
          patch({
            subCategories: append<SubCategoryModel>([subCategory])
          })
        );
      })
    );
  }

  @Action(ClearSubCategory)
  clearSubCategories(ctx: StateContext<SubCategoryStateModel>, action: ClearSubCategory) {
    ctx.setState({
      subCategories: null
    });
  }

  @Action(RemoveTagsFromSubCategory)
  removeTagsFromSubCategory(ctx: StateContext<SubCategoryStateModel>, action: RemoveTagsFromSubCategory) {
    return this.subCategoryService.removeTagsFromSubCategory(action.id, action.payload).pipe(
      tap((subCategoryModel: SubCategoryModel) => {
        ctx.setState(patch(
          {
            subCategories: updateItem<SubCategoryModel>(sub => sub.id === action.id, subCategoryModel)
          }
        ));
      })
    );
  }
}
