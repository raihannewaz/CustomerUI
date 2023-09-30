import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { CheckoutService } from '../checkout.service';
import { Basket, ClBasket } from 'src/app/shared/models/basket';
import { Order, OrderToCreate } from 'src/app/shared/models/order';
import { Address } from 'src/app/shared/models/address';
import { BasketService } from 'src/app/basket/basket.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.css']
})
export class CheckoutPaymentComponent implements OnInit{
  @Input() checkoutForm?: FormGroup;
  @Input() addressData: any; 
  @Input() deliveryMethodId!: number; 
 
 constructor(private checkoutService:CheckoutService, private basketService:BasketService, private router:Router){}
  
 ngOnInit(): void {
     
 }
 
 submitOrder() {
  
  const basket = this.basketService.getCurrentBasketValue();
  const orderToCreate = this.getOrderToCreate(basket);
  this.checkoutService.createOrder(orderToCreate).subscribe((order:Order) =>{
this.basketService.deleteLocalBasket();
const navigation: NavigationExtras ={state:order}
this.router.navigate(['checkout/success'], navigation)
console.log(order)
  })
}





getOrderToCreate(basket: Basket | null) {
  const basketId = basket?.customerId || '';

  return {
    basketId: basketId,
    deliveryMethodId: this.checkoutForm?.get('deliveryForm')?.get('deliveryMethod')?.value,
    shipToAddress: this.checkoutForm?.get('addressForm')?.value
  };
}

  
}