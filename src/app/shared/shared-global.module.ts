import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CustomFormsModule} from 'ngx-custom-validators';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {NgbDropdownModule, NgbModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {ClipboardModule} from 'ngx-clipboard';
import {InvalidCredentialsComponent} from './components/invalid-credentials/invalid-credentials.component';
import {ShowErrorDialogComponent} from './components/show-error-dialog/show-error-dialog.component';
import {MaterialModule} from './modules/material.module';
import {NgxModule} from './modules/ngx.module';
import {FileModule} from './modules/file.module';
import { AddContactsComponent } from './components/add-contacts/add-contacts.component';
import {NgxDropzoneModule} from 'ngx-dropzone';

@NgModule({
  declarations: [InvalidCredentialsComponent, ShowErrorDialogComponent, AddContactsComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FileModule,
    NgxModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    ClipboardModule,
    CustomFormsModule,
    NgbDropdownModule,
    NgbPaginationModule,
    NgxDropzoneModule,
    BsDropdownModule.forRoot(),
  ],
  exports: [
    MaterialModule,
    ClipboardModule,
    NgbModule,
    FileModule,
    ReactiveFormsModule,
    FormsModule,
    NgxModule,
    NgxDropzoneModule,
    InvalidCredentialsComponent,
    ShowErrorDialogComponent,
    CustomFormsModule,
    BsDropdownModule,
    NgbDropdownModule,
    NgbPaginationModule,
    AddContactsComponent,
  ]
})
export class SharedModule {
}
