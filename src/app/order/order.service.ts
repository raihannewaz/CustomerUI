import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Order } from '../shared/models/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }
  
  getOrdersForUser() {
    return this.http.get<Order[]>(this.baseUrl + 'Order');
  }
  getOrderDetailed(id: number) {
    return this.http.get<Order>(this.baseUrl + 'Order/Confirmed/' + id);
  }
}
