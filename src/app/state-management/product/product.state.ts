import {Action, Selector, State, StateContext, Store} from '@ngxs/store';
import {ProductActions, ProductStateModel} from './product.actions';
import {Injectable} from '@angular/core';
import {ProductService} from '../../services/product/product.service';
import FetchAllProducts = ProductActions.FetchAllProducts;
import {tap} from 'rxjs/operators';
import {ProductModel} from '../../models/Products/product.model';
import FetchFilteredProductsByRange = ProductActions.FetchFilteredProductsByRange;
import FetchProductsByStockExistence = ProductActions.FetchProductsByStockExistence;
import UpdateProduct = ProductActions.UpdateProduct;
import ManageProductImages = ProductActions.ManageProductImages;
import {append, patch, removeItem, updateItem} from '@ngxs/store/operators';
import DeleteProduct = ProductActions.DeleteProduct;
import AddTagsToProduct = ProductActions.AddTagsToProduct;
import RemoveTagsFromProduct = ProductActions.RemoveTagsFromProduct;
import {ProductTagModel} from '../../models/Products/product-tag.model';
import DeleteSubCategoryProducts = ProductActions.DeleteSubCategoryProducts;
import ClearProducts = ProductActions.ClearProducts;
import {SubCategoryService} from '../../services/category/sub-category.service';
import AddNewProduct = ProductActions.AddNewProduct;

@State<ProductStateModel>({
  name: 'products',
  defaults: {
    products: null
  }
})

@Injectable()
export class ProductState {
  constructor(private productService: ProductService, private subCategoryService: SubCategoryService,
              private store: Store) {
  }

  @Selector()
  static Products(state: ProductStateModel) {
    return state.products;
  }

  @Action(FetchAllProducts)
  fetchAllProducts(ctx: StateContext<ProductStateModel>, action: FetchAllProducts) {
    return this.productService.getAllProducts().pipe(
      tap((data: ProductModel[]) => {
        ctx.setState({
          products: data
        });
      })
    );
  }

  @Action(FetchFilteredProductsByRange)
  fetchFilteredProductsByRange(ctx: StateContext<ProductStateModel>, action: FetchFilteredProductsByRange) {
    return this.productService.getFilteredProductsByRange(action.range1, action.range2).pipe(
      tap((data: ProductModel[]) => {
        ctx.setState({
          products: data
        });
      })
    );
  }

  @Action(FetchProductsByStockExistence)
  fetchProductsByStockExistence(ctx: StateContext<ProductStateModel>, action: FetchProductsByStockExistence) {
    return this.productService.getProductsByStockExistence(action.stock).pipe(
      tap((data: ProductModel[]) => {
        ctx.setState({
          products: data
        });
      })
    );
  }

  @Action(ManageProductImages)
  manageProductImages(ctx: StateContext<ProductStateModel>, action: ManageProductImages) {
    return this.productService.manageProductImages(action.id, action.formImages, action.type).pipe(
      tap((updatedProduct: ProductModel) => {
        ctx.setState(patch({
          products: updateItem<ProductModel>(product => product.id === action.id, updatedProduct)
        }));
      })
    );
  }

  @Action(DeleteSubCategoryProducts)
  deleteSubCategoryProducts(ctx: StateContext<ProductStateModel>, action: DeleteSubCategoryProducts) {
    const products = this.store.selectSnapshot(ProductState.Products);
    for (let i = 0; i < products.length; i++) {
      if (products[i].subCategoryId === action.subCategoryId) {
        ctx.setState(patch({
          products: removeItem<ProductModel>(product => product.id === products[i].id)
        }));
      }
    }
  }

  getCloneProduct(id: number) {
    return Object.assign({}, this.store.selectSnapshot(ProductState.Products)
      .find(p => p.id === id));
  }

  @Action(AddTagsToProduct)
  addTagsToProduct(ctx: StateContext<ProductStateModel>, action: AddTagsToProduct) {
    return this.productService.addTagsToProduct(action.id, action.payload).pipe(
      tap((addedProductTags: ProductTagModel[]) => {
        const product = this.getCloneProduct(action.id);
        for (let i = 0; i < addedProductTags.length; i++) {
          product.productTags = [...product.productTags, addedProductTags[i]];
        }
        ctx.setState(patch({
          products: updateItem<ProductModel>(p => p.id === action.id, product)
        }));
      })
    );
  }

  @Action(RemoveTagsFromProduct)
  removeTagsFromProduct(ctx: StateContext<ProductStateModel>, action: RemoveTagsFromProduct) {
    return this.productService.removeTagsFromProduct(action.id, action.payload).pipe(
      tap((updatedProduct: ProductModel) => {
        ctx.setState(patch(
          {
            products: updateItem<ProductModel>(product => product.id === action.id, updatedProduct)
          }
        ));
      })
    );
  }

  @Action(UpdateProduct)
  updateProduct(ctx: StateContext<ProductStateModel>, action: UpdateProduct) {
    return this.productService.updateProduct(action.id, action.updateProductDto).pipe(
      tap((updatedProduct: ProductModel) => {
        ctx.setState(patch(
          {
            products: updateItem<ProductModel>(product => product.id === action.id, updatedProduct)
          }
        ));
      })
    );
  }

  @Action(AddNewProduct)
  addNewProduct(ctx: StateContext<ProductStateModel>, action: AddNewProduct) {
    return this.subCategoryService.addNewProduct(action.id, action.formData, action.type).pipe(
      tap((productModel: ProductModel) => {
        ctx.setState(patch(
          {
            products: append<ProductModel>([productModel])
          }
        ));
      })
    );
  }

  @Action(ClearProducts)
  clearProducts(ctx: StateContext<ProductStateModel>, action: ClearProducts) {
    ctx.setState({
      products: null
    });
  }

  @Action(DeleteProduct)
  deleteProduct(ctx: StateContext<ProductStateModel>, action: DeleteProduct) {
    return this.productService.deleteProduct(action.id).pipe(
      tap(() => {
        ctx.setState(patch(
          {
            products: removeItem<ProductModel>(product => product.id === action.id)
          }
        ));
      })
    );
  }
}
