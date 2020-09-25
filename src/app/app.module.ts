import {AppComponent} from './app.component';
import {AppRoutingModule} from './app.routing';
import {environment} from '../environments/environment';
import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import {AuthLayoutComponent} from './layouts/auth-layout/auth-layout.component';
import {TokenInterceptor} from './services/auth/token.interceptor';
import {ComponentsModule} from './components/components.module';
import {States, StatesNames} from './state-management/states';
import {CategoryLayoutComponent} from './layouts/category-layout/category-layout.component';
import {InvoiceLayoutComponent} from './layouts/invoice-layout/invoice-layout.component';
import {OrderLayoutComponent} from './layouts/order-layout/order-layout.component';
import {PaymentLayoutComponent} from './layouts/payment-layout/payment-layout.component';
import {ProductLayoutComponent} from './layouts/product-layout/product-layout.component';
import {SubCategoryLayoutComponent} from './layouts/sub-category-layout/sub-category-layout.component';
import {TagLayoutComponent} from './layouts/tag-layout/tag-layout.component';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {NgxsModule} from '@ngxs/store';
import {NgxsStoragePluginModule, StorageOption} from '@ngxs/storage-plugin';
import {SharedModule} from './shared/shared-global.module';
import {ErrorInterceptor} from './services/auth/error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    CategoryLayoutComponent,
    InvoiceLayoutComponent,
    OrderLayoutComponent,
    PaymentLayoutComponent,
    ProductLayoutComponent,
    SubCategoryLayoutComponent,
    TagLayoutComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    NgxsModule.forRoot(States, {
      developmentMode: !environment.production
    }),
    NgxsStoragePluginModule.forRoot({
      key: StatesNames,
      storage: StorageOption.LocalStorage
    }),
    SharedModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
