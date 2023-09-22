import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketTotals } from '../models/basket';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-order-total',
  templateUrl: './order-total.component.html',
  styleUrls: ['./order-total.component.css']
})
export class OrderTotalComponent implements OnInit {

  basketTotal$!: Observable<BasketTotals|null>
  constructor(private basketService:BasketService){}

  ngOnInit(): void {
      this.basketTotal$=this.basketService.basketTotal$;
  }
}
