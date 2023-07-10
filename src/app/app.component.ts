import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
import { Position } from './services/admin/alertify.service';
declare var $: any // link olarak jquery ekledikten sonra burada sisteme ekledik(jquery)

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'EticaretClient';

  constructor(private toastrService: CustomToastrService) {

    toastrService.message("merhaba","Arslan",{
      messageType: ToastrMessageType.Info,
      position: ToastrPosition.TopCenter
    }
    );
   
  }
}


