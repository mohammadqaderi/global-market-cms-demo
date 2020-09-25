import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HelperService} from '../../../shared/services/helper.service';
import {SubCategoryModel} from '../../../models/Categories/sub-category.model';
import {SubCategoryService} from '../../../services/category/sub-category.service';
import {Store} from '@ngxs/store';
import {CategoryModel} from '../../../models/Categories/category.model';
import {SubCategoryActions} from '../../../state-management/sub-category/sub-category.actions';
import AddNewSubCategory = SubCategoryActions.AddNewSubCategory;

@Component({
  selector: 'app-add-sub-category',
  templateUrl: './add-sub-category.component.html',
  styleUrls: ['./add-sub-category.component.css']
})
export class AddSubCategoryComponent implements OnInit, OnDestroy {

  @ViewChild('errorTemplate', {static: true}) errorTemplate: TemplateRef<any>;

  addSubCategoryForm: FormGroup;
  @Input() helperService: HelperService;
  @Input() subCategories: SubCategoryModel[];
  @Input() categories: CategoryModel[];
  @Output()
  change: EventEmitter<any> = new EventEmitter<any>();
  referenceSubCategories = [];

  constructor(private fb: FormBuilder, private s: SubCategoryService, private store: Store) {
  }

  ngOnInit(): void {
    this.addSubCategoryForm = this.fb.group({
      categoryId: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
    });
    for (let i = 0; i < this.subCategories.length; i++) {
      this.helperService.referenceItems.push({id: this.subCategories[i].id, name: this.subCategories[i].name});
    }
  }

  addSubCategory() {
    let refArray = [];
    for (let i = 0; i < this.helperService.chosenReferences.length; i++) {
      refArray = [...refArray, this.helperService.chosenReferences[i].id];
    }
    let obj = {
      name: this.addSubCategoryForm.value.name,
      description: this.addSubCategoryForm.value.description,
      references: refArray
    };
    this.helperService.showSpinner('Adding Sub Category');
    this.store.dispatch(new AddNewSubCategory(+this.addSubCategoryForm.value.categoryId, obj)).subscribe(() => {
      this.helperService.hideSpinner();
      this.helperService.openSnackbar('Sub Category added successfully', 'Okay');
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
