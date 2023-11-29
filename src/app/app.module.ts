import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { UiModule } from './ui/ui.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import {  HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent

  ],
  imports: [
    BrowserModule,  // bu modül olmazsa animasyonel bir şekilde geçiş yapılması imkansız olur
    AppRoutingModule,
    AdminModule,
    UiModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),  // bildirim modülü (ui için)
    NgxSpinnerModule,  // Geçiş animasyonları modülü sadece bulunduğu modülde çalışıyor !!!
    HttpClientModule
  ],
  providers: [
    {provide:"baseUrl", useValue:"https://localhost:7117/api", multi:true} // istek göndereceğimiz url burada tutuyoruz
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
