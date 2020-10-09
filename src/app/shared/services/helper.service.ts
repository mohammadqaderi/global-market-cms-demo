import {Injectable, TemplateRef} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {NgxSpinnerService} from 'ngx-spinner';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FileUploader} from 'ng2-file-upload';
import {ErrorMessages} from '../../commons/helpers/functions/error-messages';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {extname} from 'path';
import {TagModel} from '../../models/Tag/tag.model';
import {MatChipInputEvent} from '@angular/material/chips';
import {MatTableDataSource} from '@angular/material/table';
import {ProductModel} from '../../models/Products/product.model';
import {CategoryModel} from '../../models/Categories/category.model';
import {SubCategoryModel} from '../../models/Categories/sub-category.model';
import {OrderModel} from '../../models/Orders/order.model';
import {PaymentModel} from '../../models/Payments/payment.model';
import {InvoiceModel} from '../../models/Invoice/invoice.model';
import {UserModel} from '../../models/Auth/user.model';
import {NotificationEntity} from '../../models/Notifications/models/notification-entity';
import {Observable, Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  modalRef: BsModalRef;
  selectedImage = null;
  startLoadingFlag = false;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  isInvalidImageType = false;
  validImageTypes = ['.jpg', '.jpeg', '.png'];
  startPushing = false;
  startDeleting = false;
  imageErrorMessage = null;
  imageFormData = new FormData();

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  error: {
    error: string,
    message: string,
    statusCode: number
  };


  // For Connection
  onlineEvent: Observable<Event>;

  setIsOnline(value: boolean) {
    sessionStorage.removeItem('isOnline');
    sessionStorage.setItem('isOnline', String(value));
  }

  offlineEvent: Observable<Event>;
  subscriptions: Subscription[] = [];

  // For References
  selectedReferences: any[] = [];
  chosenReferences = [];
  referenceItems: { id: number, name: string }[] = [];

  pushReferences() {
    for (let i = 0; i < this.selectedReferences.length; i++) {
      this.chosenReferences.push({
        id: this.selectedReferences[i].id,
        name: this.selectedReferences[i].name
      });
      this.referenceItems = this.referenceItems.filter(ref => ref.id !== this.selectedReferences[i].id);
    }
  }

  removeReference(reference: string) {
    this.referenceItems.push(this.chosenReferences.find(c => c.name === reference));
    this.chosenReferences = this.chosenReferences.filter(c => c.name !== reference);
  }

  // prepare update references process //
  prepareUpdateReferenceProcess(array: any, obj: any) {
    this.referenceItems = [];
    for (let i = 0; i < array.length; i++) {
      if (array[i].id !== obj.id) {
        this.referenceItems.push({id: array[i].id, name: array[i].name});
      }
    }
    for (let i = 0; i < this.referenceItems.length; i++) {
      const ref = obj.references.find(r => r === this.referenceItems[i].id);
      if (ref) {
        this.chosenReferences.push({
          id: this.referenceItems[i].id,
          name: this.referenceItems[i].name
        });
      }
    }
    for (let i = 0; i < obj.references.length; i++) {
      const ref = this.referenceItems.find(r => r.id === obj.references[i]);
      if (ref) {
        this.referenceItems = this.referenceItems.filter(r => r.id !== ref.id);
      }
    }
  }

  //

  clearReferences() {
    this.chosenReferences = [];
    this.selectedReferences = [];
    this.referenceItems = [];
  }

  //

  // For Tags
  tags: TagModel[] = null;
  transitionTags: TagModel[] = [];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.tags.push(value.trim() as any);
    }
    if (input) {
      input.value = '';
    }
  }

  pushTag(tag: any) {
    this.transitionTags.push(tag);
    this.tags.splice(this.tags.indexOf(tag), 1);
  }

  remove(tag: any): void {
    const index = this.transitionTags.indexOf(tag);
    if (index >= 0) {
      this.tags.push(tag);
      this.transitionTags.splice(index, 1);
    }
  }

  clearTags() {
    this.chosenReferences = [];
    this.selectedReferences = [];
  }

  // For Product Images

  files: File[] = [];

  onSelect(event) {
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  //


  // Tables Data Sources
  productDataSource: MatTableDataSource<ProductModel> = new MatTableDataSource<ProductModel>([]);
  categoryDataSource: MatTableDataSource<CategoryModel> = new MatTableDataSource<CategoryModel>([]);
  subCategoryDataSource: MatTableDataSource<SubCategoryModel> = new MatTableDataSource<SubCategoryModel>([]);
  orderDataSource: MatTableDataSource<OrderModel> = new MatTableDataSource<OrderModel>([]);
  paymentDataSource: MatTableDataSource<PaymentModel> = new MatTableDataSource<PaymentModel>([]);
  invoiceDataSource: MatTableDataSource<InvoiceModel> = new MatTableDataSource<InvoiceModel>([]);
  userDataSource: MatTableDataSource<UserModel> = new MatTableDataSource<UserModel>([]);
  notificationsDataSource: MatTableDataSource<NotificationEntity> = new MatTableDataSource<NotificationEntity>([]);

  //
  showErrorDialog(error: any, template: any) {
    this.hideSpinner();
    this.error = error;
    this.openModal(template);
  }


  constructor(private dialog: MatDialog, private modalService: BsModalService,
              private spinner: NgxSpinnerService,
              private snackBar: MatSnackBar) {
  }

  public uploader: FileUploader = new FileUploader({});
  errorMessages = new ErrorMessages();
  state: string;

  // showing Dialogs
  openDialog(template: TemplateRef<any>) {
    this.dialog.open(template);
  }

  hideDialog() {
    this.dialog.closeAll();
  }

  // Showing Modals
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  hideModal() {
    this.modalRef.hide();
  }

  applyFilter(dataSource: any, event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    dataSource.filter = filterValue.trim().toLowerCase();
  }

  // For Spinners
  showSpinner(state: string) {
    this.state = state;
    this.spinner.show();
  }

  hideSpinner() {
    this.spinner.hide();
  }

  getFile(event) {
    return event.files[0] as File;
  }

  getFileExtension(file) {
    return extname(file.name);
  }

  isValidImageType(fileExtension) {
    return this.validImageTypes.some(type => type === fileExtension);
  }


  onImageSelect(event) {
    const file = event.files[0] as File;
    const fileExtension = this.getFileExtension(file);
    if (!this.isValidImageType(fileExtension)) {
      this.isInvalidImageType = true;
      return;
    }
    const imageReader = new FileReader();
    this.imageFormData.append('image', file);
    imageReader.onload = (d: any) => {
      this.selectedImage = d.target.result;
    };
    imageReader.onerror = (e: any) => {
      console.log('File could not be read: ' + e.target.error.code);
    };
    this.imageErrorMessage = null;
    this.isInvalidImageType = false;
    imageReader.readAsDataURL(file);
  }


  closeDialog() {
    this.adjustData();
    this.hideDialog();
  }

  adjustData() {
    this.imageFormData.delete('image');
    this.selectedImage = null;
    this.isInvalidImageType = false;
    this.startLoadingFlag = false;
    this.imageErrorMessage = null;
  }

  // for toast messages
  openSnackbar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }


}
