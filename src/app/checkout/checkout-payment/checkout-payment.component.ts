import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { CheckoutService } from '../checkout.service';
import { Basket, ClBasket } from 'src/app/shared/models/basket';
import { Order, OrderToCreate } from 'src/app/shared/models/order';
import { BasketService } from 'src/app/basket/basket.service';
import { NavigationExtras, Router } from '@angular/router';

declare var Stripe:any;

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.css']
})
export default class CheckoutPaymentComponent implements AfterViewInit, OnDestroy{
  @Input() checkoutForm?: FormGroup;
  @Input() addressData: any; 
  @Input() deliveryMethodId!: number;
  @ViewChild('cardNumber') cardNumberElement?: ElementRef;
  @ViewChild('cardExpiry') cardExpiryElement?: ElementRef;
  @ViewChild('cardCvc') cardCvcElement?: ElementRef;
  stripe: any | null = null;
  cardNumber?:any
  cardExpiry?: any;
  cardCvc?: any;
  cardErrors!: 'Error Found';
  cardHandler = this.onChange.bind(this);
 
 constructor(private checkoutService:CheckoutService,
  private basketService:BasketService,
  private router:Router){}

  ngOnDestroy() {
   this.cardNumber.destroy();
   this.cardExpiry.destroy();
   this.cardCvc.destroy();
  }


  ngAfterViewInit() {
    this.stripe = Stripe('pk_test_51No6cGG8YvRc5136RyBJEcdrl7UjfaCuIVFzqX15dlKFQBT2NyyJ8YqmQdV3WZmFXsNqKPVt66ewaC1BaIi4eK9600jpn0Ta8E');
    const elements = this.stripe.elements();

    this.cardNumber = elements.create('cardNumber');
    this.cardNumber.mount(this.cardNumberElement?.nativeElement);
    this.cardNumber.addEvenetListner('change', this.cardHandler)

    this.cardExpiry = elements.create('cardExpiry');
    this.cardExpiry.mount(this.cardExpiryElement?.nativeElement);
    this.cardExpiry.addEvenetListner('change', this.cardHandler)


    this.cardCvc = elements.create('cardCvc');
    this.cardCvc.mount(this.cardCvcElement?.nativeElement);
    this.cardCvc.addEvenetListner('change', this.cardHandler)

  }


  onChange() {

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