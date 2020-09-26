import {AuthState} from './auth/auth.state';
import {CartState} from './cart/cart.state';
import {CategoryState} from './category/category.state';
import {OrderState} from './order/order.state';
import {InvoiceState} from './invoice/invoice.state';
import {ProfileState} from './profile/profile.state';
import {ProductState} from './product/product.state';
import {SubCategoryState} from './sub-category/sub-category.state';
import {TagState} from './tag/tag.state';
import {UserState} from './user/user.state';
import {PaymentState} from './payment/payment.state';
import {GlobalDataState} from './global-data/global-data.state';
import {NotificationState} from './notification/notification.state';

export const StatesNames = [
  'auth',
  'profile',
  'cart',
  'categories',
  'orders',
  'invoices',
  'tags',
  'subCategories',
  'payments',
  'users',
  'products',
  'notificationsData',
  'globalData'
];
export const States = [
  AuthState,
  CartState,
  ProductState,
  CategoryState,
  PaymentState,
  SubCategoryState,
  TagState,
  InvoiceState,
  ProfileState,
  OrderState,
  UserState,
  NotificationState,
  GlobalDataState
];
