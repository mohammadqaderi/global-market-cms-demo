import {NgModule} from '@angular/core';
import {CommonModule,} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';
import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import {AdminAuthGuard} from './commons/guards/admin-auth.guard';
import {CategoryLayoutComponent} from './layouts/category-layout/category-layout.component';
import {InvoiceLayoutComponent} from './layouts/invoice-layout/invoice-layout.component';
import {SubCategoryLayoutComponent} from './layouts/sub-category-layout/sub-category-layout.component';
import {OrderLayoutComponent} from './layouts/order-layout/order-layout.component';
import {PaymentLayoutComponent} from './layouts/payment-layout/payment-layout.component';
import {TagLayoutComponent} from './layouts/tag-layout/tag-layout.component';
import {ProductLayoutComponent} from './layouts/product-layout/product-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full',
  }, {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AdminAuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(a => a.AdminLayoutModule)
      }
    ]
  },
  {
    path: '',
    component: InvoiceLayoutComponent,
    canActivate: [AdminAuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./layouts/invoice-layout/invoice-layout.module').then(i => i.InvoiceLayoutModule)
      }
    ]
  },
  {
    path: '',
    component: ProductLayoutComponent,
    canActivate: [AdminAuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./layouts/product-layout/product-layout.module').then(p => p.ProductLayoutModule)
      }
    ]
  },
  {
    path: '',
    component: SubCategoryLayoutComponent,
    canActivate: [AdminAuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./layouts/sub-category-layout/sub-category-layout.module').then(subC => subC.SubCategoryLayoutModule)
      }
    ]
  },
  {
    path: '',
    component: OrderLayoutComponent,
    canActivate: [AdminAuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./layouts/order-layout/order-layout.module').then(o => o.OrderLayoutModule)
      }
    ]
  },
  {
    path: '',
    component: PaymentLayoutComponent,
    canActivate: [AdminAuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./layouts/payment-layout/payment-layout.module').then(p => p.PaymentLayoutModule)
      }
    ]
  },
  {
    path: '',
    component: CategoryLayoutComponent,
    canActivate: [AdminAuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./layouts/category-layout/category-layout.module').then(c => c.CategoryLayoutModule)
      }
    ]
  },
  {
    path: '',
    component: TagLayoutComponent,
    canActivate: [AdminAuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./layouts/tag-layout/tag-layout.module').then(t => t.TagLayoutModule)
      }
    ]
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./layouts/auth-layout/auth-layout.module').then(a => a.AuthLayoutModule)
  }, {
    path: '**',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
