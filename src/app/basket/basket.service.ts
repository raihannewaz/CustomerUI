import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Basket } from '../shared/models/basket';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  baseUrl = environment.apiUrl;
  //private basketSource = new BehaviorSubject<Basket>();

  constructor(private http:HttpClient) { }
}
