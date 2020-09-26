import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CustomFormsModule} from 'ngx-custom-validators';
import {NgbDropdownModule, NgbModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {ClipboardModule} from 'ngx-clipboard';
import {ShowErrorDialogComponent} from './components/show-error-dialog/show-error-dialog.component';
import {MaterialModule} from './modules/material.module';
import {NgxModule} from './modules/ngx.module';
import {FileModule} from './modules/file.module';
import {AddContactsComponent} from './components/add-contacts/add-contacts.component';
import {NgxDropzoneModule} from 'ngx-dropzone';
import {AngularEditorModule} from '@kolkov/angular-editor';

@NgModule({
  declarations: [ ShowErrorDialogComponent, AddContactsComponent,
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
    AngularEditorModule,
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
    ShowErrorDialogComponent,
    CustomFormsModule,
    NgbDropdownModule,
    AngularEditorModule,
    NgbPaginationModule,
    AddContactsComponent,
  ]
})
export class SharedModule {
}
