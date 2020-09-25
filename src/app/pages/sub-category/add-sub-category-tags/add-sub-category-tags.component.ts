import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {HelperService} from '../../../shared/services/helper.service';
import {GlobalDataService} from '../../../shared/services/global-data.service';
import {Store} from '@ngxs/store';
import {SubCategoryModel} from '../../../models/Categories/sub-category.model';
import {SubCategoryActions} from '../../../state-management/sub-category/sub-category.actions';
import AddTagsToSubCategory = SubCategoryActions.AddTagsToSubCategory;

@Component({
  selector: 'app-add-sub-category-tags',
  templateUrl: './add-sub-category-tags.component.html',
  styleUrls: ['./add-sub-category-tags.component.css']
})
export class AddSubCategoryTagsComponent implements OnInit, OnDestroy {
  @Input() subCategory: SubCategoryModel;
  @Input() helperService: HelperService;
  @Input() gdService: GlobalDataService;
  @Input() store: Store;
  @Output()
  change: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }


  addTags() {
    this.helperService.startPushing = true;
    let tags = [];
    for (let i = 0; i < this.helperService.transitionTags.length; i++) {
      tags = [...tags, this.helperService.transitionTags[i].id];
    }
    this.store.dispatch(new AddTagsToSubCategory(this.subCategory.id, {tags})).subscribe(() => {
      this.helperService.hideDialog();
      this.helperService.openSnackbar(`Tags added successfully into sub-category`, 'Okay');
      this.helperService.startPushing = false;
      this.change.emit();
    });

  }

  ngOnInit(): void {
    this.helperService.tags = [].concat(this.gdService.Tags);
    if (this.subCategory && this.subCategory.subCategoryTags.length > 0) {
      for (let i = 0; i < this.subCategory.subCategoryTags.length; i++) {
        let isExist = this.helperService.tags.find(tag => tag.id === this.subCategory.subCategoryTags[i].tagId);
        if (isExist) {
          this.helperService.tags.splice(this.helperService.tags.indexOf(isExist), 1);
        }
      }
    }
  }

  ngOnDestroy(): void {
    this.helperService.clearTags();
  }

}
