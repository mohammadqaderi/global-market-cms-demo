import {Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {ProductModel} from '../../../models/Products/product.model';
import {HelperService} from '../../../shared/services/helper.service';
import {GlobalDataService} from '../../../shared/services/global-data.service';
import {Store} from '@ngxs/store';
import {TagModel} from '../../../models/Tag/tag.model';
import {MatChipInputEvent} from '@angular/material/chips';
import {ProductTagModel} from '../../../models/Products/product-tag.model';
import {ProductActions} from '../../../state-management/product/product.actions';
import RemoveTagsFromProduct = ProductActions.RemoveTagsFromProduct;
import {PushClientActivity} from '../../../state-management/activity/activity.actions';
import {ActivityType} from '../../../commons/enums/activity-type.enum';

@Component({
  selector: 'app-remove-product-tags',
  templateUrl: './remove-product-tags.component.html',
  styleUrls: ['./remove-product-tags.component.css']
})
export class RemoveProductTagsComponent implements OnInit {

  @Input() product: ProductModel;
  @Input() helperService: HelperService;
  @Input() gdService: GlobalDataService;
  @Input() store: Store;
  @Output()
  change: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('errorTemplate', {static: true}) errorTemplate: TemplateRef<any>;

  constructor() {
  }

  productTags: ProductTagModel[] = null;
  transitionProductTags: TagModel[] = [];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.productTags.push(value.trim() as any);
    }
    if (input) {
      input.value = '';
    }
  }

  pushTag(tag: any) {
    this.transitionProductTags.push(tag);
    this.productTags.splice(this.productTags.indexOf(tag), 1);
  }

  remove(tag: any): void {
    const index = this.transitionProductTags.indexOf(tag);
    if (index >= 0) {
      this.productTags.push(tag);
      this.transitionProductTags.splice(index, 1);
    }
  }

  removeTags() {
    this.helperService.startPushing = true;
    this.helperService.showSpinner('Removing Tags...');
    let removedTags = [];
    for (let i = 0; i < this.transitionProductTags.length; i++) {
      removedTags = [...removedTags, this.transitionProductTags[i].id];
    }
    this.store.dispatch(new PushClientActivity({
      user: this.gdService.Username,
      action: ActivityType.DELETING,
      description: `${this.gdService.Username} has push remove a list of tags from product: ${this.product.name}`
    }));
    this.store.dispatch(new RemoveTagsFromProduct(this.product.id, {tags: removedTags})).subscribe(() => {
      this.helperService.hideDialog();
      this.helperService.hideSpinner();
      this.helperService.openSnackbar(`Tags removed successfully from product`, 'Okay');
      this.helperService.startPushing = false;
      this.change.emit();
    }, error => {
      this.helperService.hideDialog();
      this.helperService.showErrorDialog(error, this.errorTemplate);
    });
  }

  ngOnInit(): void {
    this.productTags = [].concat(this.product.productTags);
    if (this.product && this.product.productTags.length > 0) {
      for (let i = 0; i < this.product.productTags.length; i++) {
        let isExist = this.productTags.find(tag => tag.id === this.product.productTags[i].tagId);
        if (isExist) {
          this.productTags.splice(this.productTags.indexOf(isExist), 1);
        }
      }
    }
  }

}
