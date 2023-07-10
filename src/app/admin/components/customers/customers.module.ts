import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersComponent } from './customers.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    CustomersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([  // Route ayarlama
      {path: "", component : CustomersComponent} // customer talebi gelirse bu componenti çalıştır. Sadece tek bir component varken path kısmını boş bırakmak daha doğru   
    ])
  ]
})
export class CustomersModule { }
