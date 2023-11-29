import { MatDialogRef } from "@angular/material/dialog";

export class BaseDialog<DialogComponent> {

  constructor(public dialogRef: MatDialogRef<DialogComponent>) {}
  close() {
    // Dialog kapama işlemi
    this.dialogRef.close()
  }
}
