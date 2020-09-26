import {Injectable} from '@angular/core';
import {Store} from '@ngxs/store';
import {AuthState} from '../../state-management/auth/auth.state';
import {ProfileModel} from '../../models/Profile/profile.model';
import {ProfileState} from '../../state-management/profile/profile.state';
import {CategoryState} from '../../state-management/category/category.state';
import {SubCategoryState} from '../../state-management/sub-category/sub-category.state';
import {ProductState} from '../../state-management/product/product.state';
import {TagState} from '../../state-management/tag/tag.state';
import {InvoiceState} from '../../state-management/invoice/invoice.state';
import {PaymentState} from '../../state-management/payment/payment.state';
import {OrderState} from '../../state-management/order/order.state';
import {Logout} from '../../state-management/auth/auth-actions';
import {ProfileActions} from '../../state-management/profile/profile.actions';
import ClearProfileData = ProfileActions.ClearProfileData;
import {InvoiceActions} from '../../state-management/invoice/invoice.actions';
import ClearInvoicesFromStorage = InvoiceActions.ClearInvoicesFromStorage;
import {OrderActions} from '../../state-management/order/order.actions';
import ClearOrdersFromStorage = OrderActions.ClearOrdersFromStorage;
import {PaymentActions} from '../../state-management/payment/payment.actions';
import ClearPaymentsFromStorage = PaymentActions.ClearPaymentsFromStorage;
import {SubCategoryActions} from '../../state-management/sub-category/sub-category.actions';
import {CategoryActions} from '../../state-management/category/category.actions';
import {ProductActions} from '../../state-management/product/product.actions';
import ClearProducts = ProductActions.ClearProducts;
import {TagActions} from '../../state-management/tag/tag.actions';
import ClearTags = TagActions.ClearTags;
import ClearCategory = CategoryActions.ClearCategory;
import ClearSubCategory = SubCategoryActions.ClearSubCategory;
import {UserState} from '../../state-management/user/user.state';
import {UserActions} from '../../state-management/user/user.actions';
import ClearUsersFromStorage = UserActions.ClearUsersFromStorage;
import {GlobalDataState} from '../../state-management/global-data/global-data.state';
import {NotificationActions} from '../../state-management/notification/notification.actions';
import ClearNotifications = NotificationActions.ClearNotifications;
import {ClearGlobalData} from '../../state-management/global-data/global-data.actions';
import {NotificationState} from '../../state-management/notification/notification.state';

@Injectable({
  providedIn: 'root'
})
export class GlobalDataService {

  constructor(private store: Store) {
  }

  get User() {
    return this.store.selectSnapshot(AuthState.Admin);
  }

  get Categories() {
    return this.store.selectSnapshot(CategoryState.Categories);
  }

  get SubCategories() {
    return this.store.selectSnapshot(SubCategoryState.SubCategories);
  }

  get Products() {
    return this.store.selectSnapshot(ProductState.Products);
  }

  get Tags() {
    return this.store.selectSnapshot(TagState.Tags);
  }

  get Users() {
    return this.store.selectSnapshot(UserState.Users);
  }

  get Invoices() {
    return this.store.selectSnapshot(InvoiceState.Invoices);
  }

  get Payments() {
    return this.store.selectSnapshot(PaymentState.Payments);
  }

  get Orders() {
    return this.store.selectSnapshot(OrderState.Orders);
  }

  get Profile(): ProfileModel | null {
    return this.store.selectSnapshot(ProfileState.Profile) ? this.store.selectSnapshot(ProfileState.Profile) : null;
  }

  IsAuthenticated() {
    return this.store.selectSnapshot(AuthState.isAuthenticated);
  }

  Token() {
    return this.store.selectSnapshot(AuthState.Token);
  }

  get GlobalData() {
    return this.store.selectSnapshot(GlobalDataState.GlobalData);
  }

  get Notifications() {
    return this.store.selectSnapshot(NotificationState.Notifications);
  }

  get Subscribers() {
    return this.store.selectSnapshot(NotificationState.Subscribers);
  }

  getInvoiceNumber(id) {
    if (this.Invoices) {
      const invoice = this.Invoices.find(i => i.id === id);
      return invoice ? invoice.number : 'No Number';
    }
  }

  getItemUser(id: number, subscriberId?: number) {
    let user = null;
    if (this.Users) {
      if (id) {
        user = this.Users.find(u => u.id === id);
        return user ? user.username : 'No User';
      } else if (subscriberId) {
        user = this.Users.find(u => u.subscriberId === subscriberId);
        return user ? user.username : 'No User';
      }
    }
  }

  userLogout() {
    return this.store.dispatch([
      new Logout(),
      new ClearProfileData(),
      new ClearInvoicesFromStorage(),
      new ClearOrdersFromStorage(),
      new ClearPaymentsFromStorage(),
      new ClearCategory(),
      new ClearProducts(),
      new ClearSubCategory(),
      new ClearNotifications(),
      new ClearGlobalData(),
      new ClearUsersFromStorage(),
      new ClearTags()]);
  }
}
