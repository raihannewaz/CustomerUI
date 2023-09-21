import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Basket, BasketItem, ClBasket } from '../shared/models/basket';
import { Product } from '../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  baseUrl = environment.apiUrl;
  private basketSource = new BehaviorSubject<Basket| null>(null);
  basket$ =this.basketSource.asObservable();

  constructor(private http: HttpClient) {}

  getBasket(id: string): Observable<Basket>{
     return this.http.get<Basket>(this.baseUrl+'Basket?id='+id)
     .pipe(
      map((basket: Basket)=>{
        this.basketSource.next(basket);
        console.log(this.getCurrentBasketValue());
        return basket;
      })
     )
  }

  setBasket(basket: Basket) {
    return this.http.post<Basket>(this.baseUrl + 'Basket', basket).subscribe(
      (response: Basket) => {
        this.basketSource.next(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getCurrentBasketValue(){
    return this.basketSource.value;
  }

  addItemToBasket(item: Product, quantity = 1) {
    const itemToAdd: BasketItem = this.mapProductItemToBasketItem(item, quantity);
  
    let basket = this.getCurrentBasketValue();
    if (!basket) {
      basket = this.createBasket();
    }
  
    basket.basketItem = this.addOrUpdateItem(basket.basketItem, itemToAdd, quantity);
  
    this.setBasket(basket);
  }
  

  private addOrUpdateItem(basketItem: BasketItem[], itemToAdd: BasketItem, quantity: number): BasketItem[] {
    console.log(basketItem);
    const index = basketItem.findIndex(i=>i.productId==itemToAdd.productId);
    if(index === -1){
      itemToAdd.quantity = quantity;
      basketItem.push(itemToAdd);
    }else{
      basketItem[index].quantity += quantity;
    }
    return basketItem;
  }


  private createBasket(): Basket {
    const basket =  new ClBasket();
    localStorage.setItem('basket_id',basket.customerId)
    return basket;
  }


  private mapProductItemToBasketItem(item: Product, quantity: number): BasketItem {
    return{
      productId:item.productId,
      productName: item.productName,
      price:item.price,
      picUrl:item.productImage,
      quantity,
      category:item.category,
      subCategory:item.subCategory,
      brand:item.brand
    }
  }


}


