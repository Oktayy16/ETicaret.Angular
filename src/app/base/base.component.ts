import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';


export class BaseComponent {

  constructor(private spinner:NgxSpinnerService) {  }

  showSpinner(spinnerNameType : SpinnerType){
    this.spinner.show(spinnerNameType)
    setTimeout(() => this.hideSpinner(spinnerNameType), 500);  // Spinner çalıştıktan sonra bunun sayesinde kapanıyor
  }

  hideSpinner(spinnerNameType : SpinnerType){
    this.spinner.hide(spinnerNameType)   
  }

}


export enum SpinnerType{
  ballAtom="s1",
  ballScaleMultiple="s2",
  ballSpinClockWiseFadeRotating = "s3"
}




