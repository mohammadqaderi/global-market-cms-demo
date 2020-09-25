import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SubCategoryModel} from '../../models/Categories/sub-category.model';
import {ApiEndpoints} from '../../commons/api-endpoints';
import {ProductModel} from '../../models/Products/product.model';
import {SubCategoryTagModel} from '../../models/Categories/sub-category-tag.model';
import {SubCategoryDto} from '../../commons/public-dto/category.dto';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {
  private prefixURI = ApiEndpoints.SubCategoryEndpoints.rootSubCategories;

  constructor(private _http: HttpClient) {
  }

  getAllSubCategories(): Observable<SubCategoryModel[]> {
    return this._http.get<SubCategoryModel[]>(this.prefixURI);
  }

  getSubCategoriesByTagName(tagName: string): Observable<SubCategoryModel> {
    return this._http.get<SubCategoryModel>(`${this.prefixURI}/search-by-tag-name/${tagName}`);
  }

  getSubCategoryById(id: number): Observable<SubCategoryModel> {
    return this._http.get<SubCategoryModel>(`${this.prefixURI}/${id}`);
  }

  addNewProduct(id: number, formData: any, type: string,
                folderName = 'products', subFolder = 'products-images'): Observable<ProductModel> {
    return this._http.post<ProductModel>
    (`${this.prefixURI}/${id}/new-product/${folderName}/${subFolder}/${type}`, formData);
  }

  addTagsToSubCategory(id: number, payload: { tags: number[] }): Observable<SubCategoryTagModel[]> {
    return this._http.post<SubCategoryTagModel[]>(`${this.prefixURI}/${id}/add-tags`, payload);
  }

  removeTagsFromSubCategory(id: number, payload: { tags: number[] }): Observable<SubCategoryModel> {
    return this._http.request<SubCategoryModel>('delete', `${this.prefixURI}/${id}/remove-tags`, {
      body: {
        payload
      }
    });
  }

  updateSubCategory(id: number, updateSubCategoryDto: SubCategoryDto): Observable<SubCategoryModel> {
    return this._http.put<SubCategoryModel>(`${this.prefixURI}/${id}/update`, updateSubCategoryDto);
  }

  deleteSubCategory(id: number): Observable<void> {
    return this._http.delete<void>(`${this.prefixURI}/${id}/delete`);
  }


}

