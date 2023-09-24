import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DeliveryMethod } from 'src/app/shared/models/deliveryMethod';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'app-checkout-delivery',
  templateUrl: './checkout-delivary.component.html',
  styleUrls: ['./checkout-delivary.component.css']
})
export class CheckoutDelivaryComponent implements OnInit {
  @Input() checkoutForm!: FormGroup;
    deliveryMethods!: DeliveryMethod[];

    constructor (private checkoutService: CheckoutService) { }

    ngOnInit() {
        this.checkoutService.getDeliveryMethod().subscribe((dm: DeliveryMethod[]) =>{
            this.deliveryMethods=dm;
        }, error => {
            console.log(error);
        });
        
    }
}
