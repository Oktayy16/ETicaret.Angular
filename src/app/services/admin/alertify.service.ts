import { Injectable } from '@angular/core';
declare var alertify: any; // bu komut sayesinde uygulamanın angularjs yüklenmiş kütüphanelerden bu olan komutu çağırır(alertify)

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  // message(message: string, messageType: MessageType, position: Position,delay: Number = 3, dismissOthers:boolean=false)
  message(message: string, options: Partial<AlertifyOptions>) { // Delay'e default değer atadık
    alertify.set('notifier','delay', options.delay)
    alertify.set('notifier','position',options.position);
    const msj = alertify[options.messageType](message)  // javascript özelliği, otomatik o string ile method kullanıyor
    if(options.dismissOthers)
      msj.dismissOthers();
  }

  dismiss(){
    alertify.dismissAll();
  }

}

// Burada default değerler atıyoruz böylece kullanımı daha kolay olacak, methodumuzda obje tabanlı method atanmış olacak
export class AlertifyOptions {
  messageType: MessageType = MessageType.Message;
  position:Position = Position.BottomLeft;
  delay: number = 3;
  dismissOthers:boolean = false;
}

// Özelleştirilmiş kullanım için enumlarla genel bir method çağrımı için enumları
export enum MessageType{
  Error =  "error",
  Message = "message",
  Notify = "notify",
  Success = "success",
  Warning = "warning"
}

export enum Position {
  TopCenter = "top-center",
  TopRight = "top-right",
  TopLeft = "top-left",
  BottomRight = "bottom-right",
  BottomCenter = "bottom-center",
  BottomLeft = "bottom-left"
}

