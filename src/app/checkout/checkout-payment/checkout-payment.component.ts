import { FormGroup } from '@angular/forms';
import { CheckoutService } from '../checkout.service';
import { Basket, ClBasket } from 'src/app/shared/models/basket';
import { Order, OrderToCreate } from 'src/app/shared/models/order';
import { BasketService } from 'src/app/basket/basket.service';
import { NavigationExtras, Router } from '@angular/router';
import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef, Input } from '@angular/core';
import { Address } from 'src/app/shared/models/address';
import { firstValueFrom } from 'rxjs';
declare var Stripe: any;


@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.css']
})
export default class CheckoutPaymentComponent implements AfterViewInit, OnDestroy{
  @Input() checkoutForm!: FormGroup;
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
  loading=false;
  
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
    this.cardNumber.addEventListener('change', this.cardHandler)

    this.cardExpiry = elements.create('cardExpiry');
    this.cardExpiry.mount(this.cardExpiryElement?.nativeElement);
    this.cardExpiry.addEventListener('change', this.cardHandler)


    this.cardCvc = elements.create('cardCvc');
    this.cardCvc.mount(this.cardCvcElement?.nativeElement);
    this.cardCvc.addEventListener('change', this.cardHandler)

  }


  onChange({ error }: { error: any }) {
    if (error) {
      this.cardErrors = error.message;
    } else {
      this.cardErrors = null as any;
    }
  }
  
  async submitOrder() {
    this.loading = true;
    const basket = this.basketService.getCurrentBasketValue();
    if (!basket) throw new Error('cannot get basket');
    try {
      const createdOrder = await this.createOrder(basket);
      const paymentResult = await this.confirmPaymentWithStripe(basket);
      if (paymentResult.paymentIntent) {
        this.basketService.deleteBasket(basket);
        const navigationExtras: NavigationExtras = {state: createdOrder};
        this.router.navigate(['checkout/success'], navigationExtras);
      }
    } catch (error: any) {
      console.log(error);
      
    } finally {
      this.loading = false;
    }
  }

  private async confirmPaymentWithStripe(basket: Basket | null) {
    if (!basket) throw new Error('Basket is null');
    const result = this.stripe?.confirmCardPayment(basket.clientSecret!, {
      payment_method: {
        card: this.cardNumber!,
        billing_details: {
          name: this.checkoutForm?.get('paymentForm')?.get('nameOnCard')?.value
        }
      }
    });
    if (!result) throw new Error('Problem attempting payment with stripe');
    return result;
  }

  private async createOrder(basket: Basket | null) {
    if (!basket) throw new Error('Basket is null');
    const orderToCreate = this.getOrderToCreate(basket);
    return firstValueFrom(this.checkoutService.createOrder(orderToCreate));
  }

  private getOrderToCreate(basket: Basket): OrderToCreate {
    const deliveryMethodId = this.checkoutForm?.get('deliveryForm')?.get('deliveryMethod')?.value;
    const shipToAddress = this.checkoutForm?.get('addressForm')?.value as Address;
    if (!deliveryMethodId || !shipToAddress) throw new Error('Problem with basket');
    return {
      basketId: basket.customerId,
      deliveryMethodId: deliveryMethodId,
      shipToAddress: shipToAddress
    }
  }



  
 
//  async submitOrder() {
//   this.loading = true;
//   const basket = this.basketService.getCurrentBasketValue();
//   try{
//     const createdOrder = await this.createOrder(basket);
//     const paymentResult = await this.confirmPaymentWithStripe(basket);
  
//     if (paymentResult.paymentIntent) {
//       this.basketService.deleteLocalBasket();
//       const navigation: NavigationExtras = { state: createdOrder };
//       this.router.navigate(['checkout/success'], navigation);
//       console.log(createdOrder);
//     }
//     this.loading = false;
//   }catch(error){
//     console.log(error);
//     this.loading = false;
//   }
  
// }

// private async confirmPaymentWithStripe(basket:any) {
//   return this.stripe.confirmCardPayment(basket?.clientSecret,{
//     payment_method:{
//       card: this.cardNumber,
//       billing_details:{
//         name: this.checkoutForm?.get('paymentForm')?.get('nameOnCard')?.value
//       }
//     }
//   })
// }
//   private async createOrder(basket: Basket | null) {
//     const orderToCreate = this.getOrderToCreate(basket);
//     return this.checkoutService.createOrder(orderToCreate).toPromise();
//   }



// getOrderToCreate(basket: Basket | null) {
//   const basketId = basket?.customerId || '';

//   return {
//     basketId: basketId,
//     deliveryMethodId: this.checkoutForm?.get('deliveryForm')?.get('deliveryMethod')?.value,
//     shipToAddress: this.checkoutForm?.get('addressForm')?.value
//   };
// }

  
}