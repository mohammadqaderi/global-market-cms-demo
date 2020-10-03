import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HelperService} from '../../../shared/services/helper.service';
import {ProductModel} from '../../../models/Products/product.model';
import {Store} from '@ngxs/store';
import {ProductActions} from '../../../state-management/product/product.actions';
import UpdateProduct = ProductActions.UpdateProduct;
import {PushClientActivity} from '../../../state-management/activity/activity.actions';
import {ActivityType} from '../../../commons/enums/activity-type.enum';
import {GlobalDataService} from '../../../shared/services/global-data.service';
import {SubCategoryModel} from "../../../models/Categories/sub-category.model";

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit, OnDestroy {
  updateProductDto: FormGroup;
  @Input() helperService: HelperService;
  @Input() products: ProductModel[];
  @Input() gdService: GlobalDataService;
  @Input() product: ProductModel;
  @Input() store: Store;
  @Output()
  change: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('errorTemplate', {static: true}) errorTemplate: TemplateRef<any>;
  subCategory: SubCategoryModel;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.updateProductDto = this.fb.group({
      name: new FormControl(this.product.name, [Validators.required]),
      description: new FormControl(this.product.description, [Validators.required]),
      currentPrice: new FormControl(this.product.currentPrice, [Validators.required]),
      quantity: new FormControl(this.product.quantity, [Validators.required]),
    });
    const subCategory = this.gdService.SubCategories.find(sc => sc.id === this.product.subCategoryId);
    this.subCategory = subCategory;
    const subCategoryProducts = [].concat(subCategory.products);
    this.helperService.prepareUpdateReferenceProcess(subCategoryProducts, this.product);

  }

  updateProduct() {
    this.helperService.showSpinner('Updating Product...');
    let references = [];
    for (let i = 0; i < this.helperService.chosenReferences.length; i++) {
      references = [...references, this.helperService.chosenReferences[i].id];
    }
    const obj = {
      name: this.updateProductDto.value.name,
      description: this.updateProductDto.value.description,
      quantity: this.updateProductDto.value.quantity,
      currentPrice: this.updateProductDto.value.currentPrice,
      references
    };

    this.store.dispatch(new PushClientActivity({
      user: this.gdService.Username,
      action: ActivityType.UPDATING,
      description: `${this.gdService.Username} has update a product: ${this.product.name}`
    }));
    this.helperService.showSpinner('Updating Product...');
    this.store.dispatch(new UpdateProduct(this.product.id, obj)).subscribe(() => {
      this.helperService.hideSpinner();
      this.helperService.openSnackbar('Product updated successfully', 'Okay');
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
