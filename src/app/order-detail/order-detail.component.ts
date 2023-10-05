import { Component, OnInit } from '@angular/core';
import { Order } from '../shared/models/order';
import { OrdersService } from '../order/order.service';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  order?: Order;
  constructor(private orderService: OrdersService, private route: ActivatedRoute,
    private bcService: BreadcrumbService) {
      this.bcService.set('@OrderDetail', '');
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    id && this.orderService.getOrderDetailed(+id).subscribe({
      next: order => {
        this.order = order;
        this.bcService.set('@OrderDetail', `Order ${order.orderId} - ${order.status}`);
      }
    })
  }
}