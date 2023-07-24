import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';

@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.scss']
})
export class BasketsComponent extends BaseComponent {
  constructor( spinner : NgxSpinnerService) {
    super(spinner)  // super ile baseclass constructure a ulaşıyoruz, gerekli parametreyi vermek gerekiyor
  }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.ballAtom);
  }
}
