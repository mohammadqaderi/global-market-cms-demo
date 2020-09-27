import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HelperService} from '../../../shared/services/helper.service';
import {Store} from '@ngxs/store';
import {SubCategoryModel} from '../../../models/Categories/sub-category.model';
import {SubCategoryActions} from '../../../state-management/sub-category/sub-category.actions';
import UpdateSubCategory = SubCategoryActions.UpdateSubCategory;
import {GlobalDataService} from '../../../shared/services/global-data.service';
import {PushClientActivity} from '../../../state-management/activity/activity.actions';
import {ActivityType} from '../../../commons/enums/activity-type.enum';

@Component({
  selector: 'app-update-sub-category',
  templateUrl: './update-sub-category.component.html',
  styleUrls: ['./update-sub-category.component.css']
})
export class UpdateSubCategoryComponent implements OnInit, OnDestroy {
  updateSubCategoryDto: FormGroup;
  @Input() helperService: HelperService;
  @Input() subCategories: SubCategoryModel[];
  @Input() subCategory: SubCategoryModel;
  @Input() gdService: GlobalDataService;
  @Input() store: Store;
  @Output()
  change: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('errorTemplate', {static: true}) errorTemplate: TemplateRef<any>;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.updateSubCategoryDto = this.fb.group({
      name: new FormControl(this.subCategory.name, [Validators.required]),
      description: new FormControl(this.subCategory.description, [Validators.required]),
    });
    this.helperService.prepareUpdateReferenceProcess(this.subCategories, this.subCategory);
  }

  updateSubCategory() {
    this.helperService.showSpinner('Updating SubCategory...');
    let references = [];
    for (let i = 0; i < this.helperService.chosenReferences.length; i++) {
      references = [...references, this.helperService.chosenReferences[i].id];
    }
    const obj = {
      name: this.updateSubCategoryDto.value.name,
      description: this.updateSubCategoryDto.value.description,
      references
    };
    this.store.dispatch(new PushClientActivity({
      user: this.gdService.Username,
      action: ActivityType.UPDATING,
      description: `${this.gdService.Username} has update sub-category: ${this.subCategory.name}`
    }));
    this.store.dispatch(new UpdateSubCategory(this.subCategory.id, obj)).subscribe(() => {
      this.helperService.hideSpinner();
      this.helperService.openSnackbar('Sub Category updated successfully', 'Okay');
      this.helperService.hideDialog();
      this.change.emit();
    }, error => {
      this.helperService.hideDialog();
      this.helperService.showErrorDialog(error, this.errorTemplate);
    });
  }

  ngOnDestroy(): void {
    this.helperService.clearReferences();
  }

}
