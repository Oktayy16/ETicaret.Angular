import { HttpErrorResponse } from '@angular/common/http';
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { DeleteDialogComponent, DeleteState } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';

declare var $ : any; // js kullanıcaz ekledik

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective  { // çağırdılan td de image oluştursun width heigh ayarlasın vb.

  
  constructor(private element : ElementRef, //çağrılan html nesnesi laızm olabilir(ElementRef)
              private _renderer: Renderer2,
              private httpClientService : HttpClientService, // Silmek için lazım olur
              private spinner  : NgxSpinnerService,
              public dialog: MatDialog,
              private alertifyService : AlertifyService,
              private dialogService : DialogService) {      
    const img = _renderer.createElement("img"); // domda image oluşturuyoruz
    img.setAttribute("src", "../../../../../assets/delete.png"); // source a değeri verince her yerde çalışmalı
    img.setAttribute("style","cursor : pointer;"); // img üzerine gelince el çıkıyor
    img.width = 30;
    img.heigh = 30;
    _renderer.appendChild(element.nativeElement, img);  // native elemente img ekle 
  }

  @Input() id : string;   //html yazılan id değerini almak için input olarak işaretleyerek aldık
  @Input() controller : string;
  @Output() callback : EventEmitter<any> = new EventEmitter();  // call back dediğimizi istediğimiz yerde tetikleyebiliriz

  @HostListener("click") // ilgili directive in kullanıldığı dom nesnesi tıklanıldığında tetiklenecek
  async onclick(){
    this.dialogService.openDialog({
      componentType : DeleteDialogComponent,
      data : DeleteState.Yes,
      afterClosed : async () => {
        this.spinner.show(SpinnerType.ballAtom)
        const td : HTMLTableCellElement = this.element.nativeElement;  // HTMLTableCellElement seçilen satır
        this.httpClientService.delete({
          controller : this.controller
        }, this.id).subscribe(data => {
          $(td.parentElement).animate({
            opacity:0,
            left:"+=50",
            height:"toogle"
          },700, () => {
            this.callback.emit();
          })  
          .fadeOut(1000, () => {  // 1000 saniye sonra bu işlemi yap demek
            this.callback.emit();
            this.alertifyService.message("Ürün başarıyla silinmiştir.", {
              dismissOthers:true,
              messageType:MessageType.Message,
              position:Position.TopRight
            });
          });
        }, (errorResponse : HttpErrorResponse)=>{
          this.spinner.hide(SpinnerType.ballAtom);
          this.alertifyService.message("Ürün silinirken beklenmeyen bir hatayla karşılaşılmıştır.", {
            dismissOthers:true,
            messageType:MessageType.Error,
            position:Position.TopRight
          });
        });
      }
    }); 
  }

  
}
