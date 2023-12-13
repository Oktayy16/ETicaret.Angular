import { Injectable } from '@angular/core';
import { DialogPosition, MatDialog } from '@angular/material/dialog';
import { ComponentType } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class DialogService{

  constructor(private dialog : MatDialog) { }

  openDialog(dialogParameters : Partial<DialogParameters>): void {
    const dialogRef = this.dialog.open(dialogParameters.componentType, {
      width: dialogParameters.options?.width,  // açılacak model genişliği
      height: dialogParameters.options?.height,
      position : dialogParameters.options?.position,
      data:  dialogParameters.data.Yes  // Diyalog açıldığında yes bilgisi gönderiyoruz
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == dialogParameters.data.Yes){
        dialogParameters.afterClosed(); // open dialog tetiklemesi için parametre olarak girmiştik
      }
    });
  }

}


export class DialogParameters {
  componentType : ComponentType<any>;
  data : any;
  afterClosed : () => void;
  options : Partial<DialogOptions> = new DialogOptions(); 
}


export class DialogOptions {
  width? : string = "250px";
  height?: string;
  position?: DialogPosition;
}