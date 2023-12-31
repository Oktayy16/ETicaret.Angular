import { Component, Input } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { HttpClientService } from '../http-client.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AlertifyService, MessageType, Position } from '../../admin/alertify.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent {

  constructor(private httpClientService : HttpClientService,
              private alertifyService : AlertifyService,
              private customToasterService : CustomToastrService) {
  }
  public files: NgxFileDropEntry[];

  @Input() options: Partial<FileUploadOptions>; // Partial yapılma nedeni obje alabilmesi için

  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;
    const fileData : FormData = new FormData();
    for (const file of files) {
      (file.fileEntry as FileSystemFileEntry).file((_file : File) => {
        fileData.append(_file.name, _file, file.relativePath);
      });
    }
    this.httpClientService.post({ // özellişterip her yerde kullanabilmek için obje verilerini ekledik
      controller:this.options.controller,
      action : this.options.action,
      queryString : this.options.queryString,
      headers : new HttpHeaders({"responseType":"blob"})
    },fileData).subscribe(data => {

      const message: string = 'Dosyalar başarıyla yüklenmiştir.';
      if(this.options.isAdminPage){ //alertify mı toaster mı ayrımı için
        this.alertifyService.message(message, {
          dismissOthers: true,
          messageType: MessageType.Success,
          position: Position.TopRight,
        });
      }else{
        this.customToasterService.message(message, "Başarılı",{
          messageType : ToastrMessageType.Success,
          position : ToastrPosition.TopRight
        });
      }

    },(errorResponse:HttpErrorResponse) => {

      const message: string = 'Dosyalar yüklenirken beklenmeyen hata ile karşılaşılmıştır.';
      if (this.options.isAdminPage) {
        //alertify mı toaster mı ayrımı için
        this.alertifyService.message(message, {
          dismissOthers: true,
          messageType: MessageType.Error,
          position: Position.TopRight,
        });
      } else {
        this.customToasterService.message(message, 'Başarısız', {
          messageType: ToastrMessageType.Error,
          position: ToastrPosition.TopRight,
        });
      }

    });
  }
}

export class FileUploadOptions{
  controller? : string;
  action? : string;
  queryString? : string;
  explanation? : string; // indirme kısmında yazacak yazı
  accept? : string;  // dosya uzantısı
  isAdminPage? : boolean = false; // admin mi yoksa user page mi ?
}
