import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Basket, BasketItem } from '../models/basket';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-basket-summary',
  templateUrl: './basket-summary.component.html',
  styleUrls: ['./basket-summary.component.css']
})
export class BasketSummaryComponent implements OnInit{

  basket$!: Observable<Basket | null>

  @Output() decrement: EventEmitter<BasketItem> = new EventEmitter<BasketItem>();

  @Output() increment: EventEmitter<BasketItem> = new EventEmitter<BasketItem>();

  @Output() remove: EventEmitter<BasketItem> = new EventEmitter<BasketItem>();

  @Input() isBasket = true;


  constructor(private  basketService:BasketService){}

ngOnInit() {
    this.basket$ = this.basketService.basket$;
}

incrementItemQuantity(item:BasketItem){
this.increment.emit(item);
}

decrementItemQuantity(item:BasketItem){
  this.decrement.emit(item);
  }

removeBasketItem(item:BasketItem){
this.remove.emit(item);
}
}
