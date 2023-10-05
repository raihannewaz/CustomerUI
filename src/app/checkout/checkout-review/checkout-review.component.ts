import { CdkStepper } from '@angular/cdk/stepper';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { Basket } from 'src/app/shared/models/basket';

@Component({
  selector: 'app-checkout-review',
  templateUrl: './checkout-review.component.html',
  styleUrls: ['./checkout-review.component.css']
})
export class CheckoutReviewComponent implements OnInit{
  @Input() appStepper?: CdkStepper;
  basket$!: Observable<Basket | null>;

  constructor(private basketService: BasketService) {}
  ngOnInit() {
   this.basket$ = this.basketService.basket$;
  }

  createPaymentIntent() {
   return this.basketService.createPaymentIntent().subscribe({
      next: () => {
        this.appStepper?.next();
      },
      error: error => (error.message)
    })
  }

}

