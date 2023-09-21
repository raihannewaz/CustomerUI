import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Basket } from '../shared/models/basket';
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
}
