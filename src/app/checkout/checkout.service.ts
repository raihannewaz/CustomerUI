import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { DeliveryMethod } from '../shared/models/deliveryMethod';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getDeliveryMethod(): Observable<DeliveryMethod[]> {
    return this.http.get<DeliveryMethod[]>(this.baseUrl + 'Order/delivery-Methods').pipe(
      map((dm: DeliveryMethod[]) => {
        return dm.sort((a, b) => b.price - a.price);
      })
    );
  }
}
