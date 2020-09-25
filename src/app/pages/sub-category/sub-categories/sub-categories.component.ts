import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {HelperService} from '../../../shared/services/helper.service';
import {GlobalDataService} from '../../../shared/services/global-data.service';
import {Store} from '@ngxs/store';
import {SubCategoryState} from '../../../state-management/sub-category/sub-category.state';
import {SubCategoryActions} from '../../../state-management/sub-category/sub-category.actions';
import FetchAllSubCategories = SubCategoryActions.FetchAllSubCategories;
import {CategoryState} from '../../../state-management/category/category.state';
import {CategoryActions} from '../../../state-management/category/category.actions';
import FetchAllCategories = CategoryActions.FetchAllCategories;
import {TagState} from '../../../state-management/tag/tag.state';
import {TagActions} from '../../../state-management/tag/tag.actions';
import FetchAllTags = TagActions.FetchAllTags;
import DeleteSubCategory = SubCategoryActions.DeleteSubCategory;

@Component({
  selector: 'app-sub-categories',
  templateUrl: './sub-categories.component.html',
  styleUrls: ['./sub-categories.component.css']
})
export class SubCategoriesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'createdAt', 'updatedAt', 'totalProducts', 'category', 'actions'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public helperService: HelperService,
              public gdService: GlobalDataService,
              public store: Store) {
    if (!this.store.selectSnapshot(CategoryState.Categories)) {
      this.store.dispatch(new FetchAllCategories()).subscribe(() => {
      });
    }
    if (!this.store.selectSnapshot(TagState.Tags)) {
      this.store.dispatch(new FetchAllTags()).subscribe(() => {
      });
    }
    if (!this.store.selectSnapshot(SubCategoryState.SubCategories)) {
      this.helperService.showSpinner('Loading Sub Categories...');
      this.store.dispatch(new FetchAllSubCategories()).subscribe(() => {
        this.helperService.hideSpinner();
        this.helperService.subCategoryDataSource.data = this.SubCategories;
      });
    } else {
      this.helperService.subCategoryDataSource.data = this.SubCategories;
    }
  }


  ngOnInit(): void {
    this.helperService.subCategoryDataSource.paginator = this.paginator;
    this.helperService.subCategoryDataSource.sort = this.sort;
  }

  getCategoryName(id) {
    if (this.gdService.Categories) {
      const categoryModel = this.gdService.Categories.find(c => c.id === id);
      return categoryModel ? categoryModel.name : 'No name';
    }
  }

  refreshSubCategories() {
    this.helperService.subCategoryDataSource.data = this.SubCategories;
  }

  deleteSubCategory(id: number) {
    this.helperService.showSpinner('Deleting Sub Category');
    this.store.dispatch(new DeleteSubCategory(id)).subscribe(() => {
      this.helperService.subCategoryDataSource.data = this.gdService.SubCategories;
      this.helperService.productDataSource.data = this.gdService.Products;
      this.helperService.hideSpinner();
      this.helperService.openSnackbar('Sub Category deleted successfully', 'okay');
    });
  }

  get SubCategories() {
    return this.gdService.SubCategories;
  }

}
