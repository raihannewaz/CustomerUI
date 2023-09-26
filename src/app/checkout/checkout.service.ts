import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { DeliveryMethod } from '../shared/models/deliveryMethod';
import { Observable, map } from 'rxjs';
import { Order, OrderToCreate } from '../shared/models/order';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getDeliveryMethods(): Observable<DeliveryMethod[]> {
    return this.http.get<DeliveryMethod[]>(this.baseUrl + 'Order/delivery-Methods').pipe(
      map((dm: DeliveryMethod[]) => {
        return dm.sort((a, b) => b.price - a.price);
      })
    );
  }


  createOrder(order: OrderToCreate) {
    return this.http.post<Order>(this.baseUrl + 'Order', order);
  }
}
