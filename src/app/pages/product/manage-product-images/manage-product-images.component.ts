import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {ProductModel} from '../../../models/Products/product.model';
import {HelperService} from '../../../shared/services/helper.service';
import {Store} from '@ngxs/store';
import {ProductActions} from '../../../state-management/product/product.actions';
import ManageProductImages = ProductActions.ManageProductImages;
import {SubCategoryModel} from '../../../models/Categories/sub-category.model';
import {ProductService} from '../../../services/product/product.service';
import {PushClientActivity} from '../../../state-management/activity/activity.actions';
import {ActivityType} from '../../../commons/enums/activity-type.enum';
import {GlobalDataService} from '../../../shared/services/global-data.service';

@Component({
  selector: 'app-manage-product-images',
  templateUrl: './manage-product-images.component.html',
  styleUrls: ['./manage-product-images.component.css']
})
export class ManageProductImagesComponent implements OnInit, OnDestroy {
  currentProductImages: string[] = [];
  removedImages: string[] = [];
  formData: FormData = new FormData();
  @Input() product: ProductModel;
  @Input() helperService: HelperService;
  @Input() store: Store;
  @Input() gdService: GlobalDataService;

  @Input() subCategories: SubCategoryModel[];
  @Output() change: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('errorTemplate', {static: true}) errorTemplate: TemplateRef<any>;

  constructor(private productService: ProductService) {
  }

  removeImage(img) {
    const index = this.currentProductImages.indexOf(img);
    if (index >= 0) {
      this.removedImages.push(img);
      this.currentProductImages.splice(index, 1);
    }
  }

  ngOnInit(): void {
    this.currentProductImages = [].concat(this.product.images);
  }

  saveProductImages() {
    if (this.helperService.files.length > 0) {
      for (let i = 0; i < this.helperService.files.length; i++) {
        this.formData.append('images', this.helperService.files[i]);
      }
    }
    if (this.removedImages.length > 0) {
      this.formData.append('removedImages', JSON.stringify(this.removedImages));
    }
    const s = this.subCategories.find(s => s.id === this.product.subCategoryId);
    const type = s ? s.name : 'Any';
    this.helperService.showSpinner('Please wait while edit images...');
    this.store.dispatch(new PushClientActivity({
      user: this.gdService.Username,
      action: ActivityType.UPDATING,
      description: `${this.gdService.Username} has manage product: ${this.product.name} images`
    }));
    this.store.dispatch(new ManageProductImages(this.product.id, this.formData, type)).subscribe(() => {
      this.helperService.hideSpinner();
      this.helperService.hideDialog();
      this.change.emit();
      this.helperService.openSnackbar('Product Images Updated Successfully', 'Okay');
    }, error => {
      this.helperService.hideDialog();
      this.helperService.showErrorDialog(error, this.errorTemplate);
    });
  }


  ngOnDestroy(): void {
    this.currentProductImages = [];
    this.removedImages = [];
    this.helperService.files = [];
  }
}
