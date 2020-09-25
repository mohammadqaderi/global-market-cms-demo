import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiEndpoints} from '../../commons/api-endpoints';
import {Observable} from 'rxjs';
import {CategoryModel} from '../../models/Categories/category.model';
import {CategoryDto, SubCategoryDto} from '../../commons/public-dto/category.dto';
import {SubCategoryModel} from '../../models/Categories/sub-category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _http: HttpClient) {
  }

  getAllCategories(): Observable<CategoryModel[]> {
    return this._http.get<CategoryModel[]>(ApiEndpoints.CategoryEndpoints.rootCategories);
  }

  getCategoryById(id: number): Observable<CategoryModel> {
    return this._http.get<CategoryModel>(`${ApiEndpoints.CategoryEndpoints.rootCategories}/${id}`);
  }

  addNewCategory(createCategoryDto: CategoryDto): Observable<CategoryModel> {
    return this._http.post<CategoryModel>(ApiEndpoints.CategoryEndpoints.rootCategories, createCategoryDto);
  }

  addNewSubCategory(id: number, createSubCategoryDto: SubCategoryDto)
    : Observable<SubCategoryModel> {
    return this._http.post<SubCategoryModel>
    (`${ApiEndpoints.CategoryEndpoints.rootCategories}/${id}/new-sub-category`, createSubCategoryDto);
  }

  updateCategory(id: number, updateCategoryDto: { name: string, description: string }): Observable<CategoryModel> {
    return this._http.put <CategoryModel>
    (`${ApiEndpoints.CategoryEndpoints.rootCategories}/${id}/update`, updateCategoryDto);
  }

  deleteCategory(id: number): Observable<void> {
    return this._http.delete <void>(`${ApiEndpoints.CategoryEndpoints.rootCategories}/${id}/delete`);
  }
}
