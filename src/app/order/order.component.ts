import { Component, OnInit } from '@angular/core';
import { Order } from '../shared/models/order';
import { OrdersService } from './order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orders: Order[] = [];

  constructor(private orderService: OrdersService) { }

  ngOnInit(): void {
    this.getOrders();
  }
  
  getOrders() {
    this.orderService.getOrdersForUser().subscribe({
      next: orders => this.orders = orders
    })
  }
}
