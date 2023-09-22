import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Basket, BasketItem } from '../shared/models/basket';
import { BasketService } from './basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent {
basket$!: Observable<Basket| null>;

constructor(private basketService:BasketService){}
ngOnInit(){
  this.basket$ = this.basketService.basket$;
}

removeBasketItem(item:BasketItem){
this.basketService.removeItemFromBasket(item);
}

incrementItemQuantity(item:BasketItem){
this.basketService.incrementItemQuantity(item);
}

decrementItemQuantity(item:BasketItem){
  this.basketService.decrementItemQuantity(item)
}

}
