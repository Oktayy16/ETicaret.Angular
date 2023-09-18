import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ProductService } from 'src/app/services/common/models/product.service';

declare var $ : any; // js kullanıcaz ekledik

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective  { // çağırdılan td de image oluştursun width heigh ayarlasın vb.

  
  constructor(private element : ElementRef, //çağrılan html nesnesi laızm olabilir(ElementRef)
              private _renderer: Renderer2,
              private productService : ProductService, // Silmek için lazım olur
              private spinner  : NgxSpinnerService
              ) { 
         
    const img = _renderer.createElement("img"); // domda image oluşturuyoruz
    img.setAttribute("src", "../../../../../assets/delete.png"); // source a değeri verince her yerde çalışmalı
    img.setAttribute("style","cursor : pointer;"); // img üzerine gelince el çıkıyor
    img.width = 30;
    img.heigh = 30;
    _renderer.appendChild(element.nativeElement, img);  // native elemente img ekle 
  }

  @Input() id : string;   //html yazılan id değerini almak için input olarak işaretleyerek aldık
  @Output() callback : EventEmitter<any> = new EventEmitter();  // call back dediğimizi istediğimiz yerde tetikleyebiliriz

  @HostListener("click") // ilgili directive in kullanıldığı dom nesnesi tıklanıldığında tetiklenecek
  async onclick(){
    this.spinner.show(SpinnerType.ballAtom)
    const td : HTMLTableCellElement = this.element.nativeElement;  // HTMLTableCellElement seçilen satır
    await this.productService.delete(this.id);
    $(td.parentElement).fadeOut(2000, () => {  // 2000 saniye sonra bu işlemi yap demek
      this.callback.emit();
    });
  }

}
