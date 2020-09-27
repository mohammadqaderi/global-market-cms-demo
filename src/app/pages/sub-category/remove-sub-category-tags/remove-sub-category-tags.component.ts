import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HelperService} from '../../../shared/services/helper.service';
import {GlobalDataService} from '../../../shared/services/global-data.service';
import {Store} from '@ngxs/store';
import {TagModel} from '../../../models/Tag/tag.model';
import {MatChipInputEvent} from '@angular/material/chips';
import {SubCategoryModel} from '../../../models/Categories/sub-category.model';
import {SubCategoryTagModel} from '../../../models/Categories/sub-category-tag.model';
import {SubCategoryActions} from '../../../state-management/sub-category/sub-category.actions';
import RemoveTagsFromSubCategory = SubCategoryActions.RemoveTagsFromSubCategory;
import {PushClientActivity} from '../../../state-management/activity/activity.actions';
import {ActivityType} from '../../../commons/enums/activity-type.enum';

@Component({
  selector: 'app-remove-sub-category-tags',
  templateUrl: './remove-sub-category-tags.component.html',
  styleUrls: ['./remove-sub-category-tags.component.css']
})
export class RemoveSubCategoryTagsComponent implements OnInit {
  @Input() subCategory: SubCategoryModel;
  @Input() helperService: HelperService;
  @Input() gdService: GlobalDataService;
  @Input() store: Store;
  @Output()
  change: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  subCategoryTags: SubCategoryTagModel[] = null;
  transitionSubCategoryTags: TagModel[] = [];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.subCategoryTags.push(value.trim() as any);
    }
    if (input) {
      input.value = '';
    }
  }

  pushTag(tag: any) {
    this.transitionSubCategoryTags.push(tag);
    this.subCategoryTags.splice(this.subCategoryTags.indexOf(tag), 1);
  }

  remove(tag: any): void {
    const index = this.transitionSubCategoryTags.indexOf(tag);
    if (index >= 0) {
      this.subCategoryTags.push(tag);
      this.transitionSubCategoryTags.splice(index, 1);
    }
  }

  removeSubCategoryTags() {
    this.helperService.startPushing = true;
    let removedTags = [];
    for (let i = 0; i < this.transitionSubCategoryTags.length; i++) {
      removedTags = [...removedTags, this.transitionSubCategoryTags[i].id];
    }
    this.helperService.showSpinner('Removing Tags...');
    this.store.dispatch(new PushClientActivity({
      user: this.gdService.Username,
      action: ActivityType.DELETING,
      description: `${this.gdService.Username} has removed tags from sub-category: ${this.subCategory.name}`
    }));
    this.store.dispatch(new RemoveTagsFromSubCategory(this.subCategory.id, {tags: removedTags})).subscribe(() => {
      this.helperService.hideDialog();
      this.helperService.openSnackbar(`Tags removed successfully from sub-category`, 'Okay');
      this.helperService.startPushing = false;
      this.change.emit();
    });
  }

  ngOnInit(): void {
    this.subCategoryTags = [].concat(this.subCategory.subCategoryTags);
    if (this.subCategory && this.subCategory.subCategoryTags.length > 0) {
      for (let i = 0; i < this.subCategory.subCategoryTags.length; i++) {
        let isExist = this.subCategoryTags.find(tag => tag.id === this.subCategory.subCategoryTags[i].tagId);
        if (isExist) {
          this.subCategoryTags.splice(this.subCategoryTags.indexOf(isExist), 1);
        }
      }
    }
  }

}
