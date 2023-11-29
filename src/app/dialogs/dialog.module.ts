import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FileUploadDialogComponent } from './file-upload-dialog/file-upload-dialog.component';


@NgModule({
  declarations: [
    DeleteDialogComponent,
    FileUploadDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule
  ],
})
export class DialogModule {

}
