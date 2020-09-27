import {Component, OnInit, ViewChild} from '@angular/core';
import {Store} from '@ngxs/store';
import {GlobalDataService} from '../../../shared/services/global-data.service';
import {HelperService} from '../../../shared/services/helper.service';
import {CategoryState} from '../../../state-management/category/category.state';
import {CategoryActions} from '../../../state-management/category/category.actions';
import FetchAllCategories = CategoryActions.FetchAllCategories;
import {CategoryModel} from '../../../models/Categories/category.model';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {CategoryDto} from '../../../commons/public-dto/category.dto';
import AddNewCategory = CategoryActions.AddNewCategory;
import UpdateCategory = CategoryActions.UpdateCategory;
import DeleteCategory = CategoryActions.DeleteCategory;
import {PushClientActivity} from '../../../state-management/activity/activity.actions';
import {ActivityType} from '../../../commons/enums/activity-type.enum';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'createdAt', 'updatedAt', 'actions'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  createCategoryDto: CategoryDto = new CategoryDto();
  updateCategoryDto: CategoryDto = new CategoryDto();

  constructor(private store: Store, private gdService: GlobalDataService,
              public helperService: HelperService) {
    if (!this.store.selectSnapshot(CategoryState.Categories)) {
      this.helperService.showSpinner('Loading Categories...');
      this.store.dispatch(new FetchAllCategories()).subscribe(() => {
        this.helperService.categoryDataSource.data = this.Categories;
        this.helperService.hideSpinner();
      });
    } else {
      this.helperService.categoryDataSource.data = this.Categories;
    }
  }

  ngOnInit(): void {
    this.helperService.categoryDataSource.paginator = this.paginator;
    this.helperService.categoryDataSource.sort = this.sort;
  }

  get Categories() {
    return this.gdService.Categories;
  }

  prepareUpdatingForm(category: CategoryModel) {
    this.updateCategoryDto.name = category.name;
    this.updateCategoryDto.description = category.description;
  }


  addCategory() {
    this.helperService.showSpinner('Adding Category');
    this.store.dispatch(new PushClientActivity({
      user: this.gdService.Username,
      action: ActivityType.CREATING,
      description: `${this.gdService.Username} create a new category`
    }));
    this.store.dispatch(new AddNewCategory(this.createCategoryDto)).subscribe(() => {
      this.afterFinishProcess();
      this.clearCreateDto();
      this.helperService.openSnackbar('Category added successfully', 'okay');
    });
  }

  afterFinishProcess() {
    this.helperService.hideDialog();
    this.helperService.hideSpinner();
    this.helperService.categoryDataSource.data = this.Categories;
  }

  updateCategory(id: number) {
    this.store.dispatch(new PushClientActivity({
      user: this.gdService.Username,
      action: ActivityType.UPDATING,
      description: `${this.gdService.Username} update a category`
    }));
    this.helperService.showSpinner('Updating Category');
    this.store.dispatch(new UpdateCategory(id, this.updateCategoryDto)).subscribe(() => {
      this.afterFinishProcess();
      this.helperService.openSnackbar('Category updated successfully', 'okay');
    });
  }

  clearCreateDto() {
    this.createCategoryDto.name = null;
    this.createCategoryDto.description = null;
  }

  deleteCategory(id: number) {
    this.helperService.showSpinner('Deleting Category');
    this.store.dispatch(new PushClientActivity({
      user: this.gdService.Username,
      action: ActivityType.DELETING,
      description: `${this.gdService.Username} delete a category`
    }));
    this.store.dispatch(new DeleteCategory(id)).subscribe(() => {
      this.helperService.categoryDataSource.data = this.Categories;
      this.helperService.subCategoryDataSource.data = this.gdService.SubCategories;
      this.helperService.productDataSource.data = this.gdService.Products;
      this.helperService.hideSpinner();
      this.helperService.openSnackbar('Category deleted successfully', 'okay');
    });
  }
}
