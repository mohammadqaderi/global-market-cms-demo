import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {HelperService} from '../../../shared/services/helper.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductModel} from '../../../models/Products/product.model';
import {SubCategoryModel} from '../../../models/Categories/sub-category.model';
import {Store} from '@ngxs/store';
import {ProductActions} from '../../../state-management/product/product.actions';
import AddNewProduct = ProductActions.AddNewProduct;

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})


export class AddProductComponent implements OnInit, OnDestroy {
  @ViewChild('errorTemplate', {static: true}) errorTemplate: TemplateRef<any>;

  addProductForm: FormGroup;
  formData: FormData = new FormData();
  @Input() helperService: HelperService;
  @Input() products: ProductModel[];
  @Input() subCategories: SubCategoryModel[];
  @Output()
  change: EventEmitter<any> = new EventEmitter<any>();

  constructor(private fb: FormBuilder, private store: Store) {
  }

  ngOnInit(): void {
    this.addProductForm = this.fb.group({
      subCategoryId: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      currentPrice: new FormControl(null, [Validators.required]),
      quantity: new FormControl(null, [Validators.required]),
    });
    for (let i = 0; i < this.products.length; i++) {
      this.helperService.referenceItems.push({id: this.products[i].id, name: this.products[i].name});
    }
  }

  addProduct() {
    this.formData.append('name', this.addProductForm.value.name);
    this.formData.append('description', this.addProductForm.value.description);
    this.formData.append('currentPrice', this.addProductForm.value.currentPrice);
    this.formData.append('quantity', this.addProductForm.value.quantity);
    if (this.helperService.chosenReferences.length > 0) {
      let arr = [];
      for (let i = 0; i < this.helperService.chosenReferences.length; i++) {
        arr.push(this.helperService.chosenReferences[i].id);
      }
      this.formData.append('references', JSON.stringify(arr));
    }
    for (let i = 0; i < this.helperService.files.length; i++) {
      this.formData.append('images', this.helperService.files[i]);
    }
    this.helperService.showSpinner('Please wait...');
    const subCategory = this.subCategories.find(s => s.id === +this.addProductForm.value.subCategoryId);
    this.store.dispatch(new AddNewProduct(+this.addProductForm.value.subCategoryId, this.formData,
      subCategory.name || 'Any Name')).subscribe(() => {
      this.helperService.hideSpinner();
      this.helperService.openSnackbar('Product added successfully', 'Okay');
      this.helperService.hideDialog();
      this.change.emit();
    }, error => {
      this.helperService.hideDialog();
      this.helperService.showErrorDialog(error, this.errorTemplate);
    });
  }

  ngOnDestroy(): void {
    this.helperService.files = [];
    this.helperService.clearReferences();
  }

}
