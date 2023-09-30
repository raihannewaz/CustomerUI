import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DeliveryMethod } from 'src/app/shared/models/deliveryMethod';
import { CheckoutService } from '../checkout.service';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-checkout-delivery',
  templateUrl: './checkout-delivary.component.html',
  styleUrls: ['./checkout-delivary.component.css']
})
export class CheckoutDelivaryComponent implements OnInit {
  @Input() checkoutForm!: FormGroup;
    deliveryMethods!: DeliveryMethod[];
    @Output() deliveryMethodChanged = new EventEmitter<number>();

    constructor (private checkoutService: CheckoutService, private basketService:BasketService) { }

    ngOnInit() {
        this.checkoutService.getDeliveryMethods().subscribe((dm: DeliveryMethod[]) =>{
            this.deliveryMethods=dm;
        }, error => {
            console.log(error);
        });
        
    }

    setShippingPrice(deliveryMethod: DeliveryMethod) {
      this.basketService.setShippingPrice(deliveryMethod);
      const selectedDeliveryMethodId = this.checkoutForm?.get('deliveryForm')?.get('deliveryMethod')?.value;
      this.deliveryMethodChanged.emit(selectedDeliveryMethodId);
    }
    

}
