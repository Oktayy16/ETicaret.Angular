import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { FileUploadComponent } from '../services/common/file-upload/file-upload.component';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    DeleteDialogComponent,
    FileUploadComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule],
})
export class DialogModule {

}
