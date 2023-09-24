import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Basket, BasketItem, BasketTotals, ClBasket } from '../shared/models/basket';
import { Product } from '../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  baseUrl = environment.apiUrl;
  private basketSource = new BehaviorSubject<Basket| null>(null);
  basket$ =this.basketSource.asObservable();

  
  private basketTotalSource = new BehaviorSubject<BasketTotals | null>(null);

  basketTotal$ = this.basketTotalSource.asObservable();

  constructor(private http: HttpClient) {}

  getBasket(id: string): Observable<Basket>{
     return this.http.get<Basket>(this.baseUrl+'Basket?id='+id)
     .pipe(
      map((basket: Basket)=>{
        this.basketSource.next(basket);
        this.calculateTotals();
        return basket;
      })
     )
  }

  setBasket(basket: Basket) {
    return this.http.post<Basket>(this.baseUrl + 'Basket', basket).subscribe(
      (response: Basket) => {
        this.basketSource.next(response);
        this.calculateTotals();
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

  private calculateTotals(){
    const basket = this.getCurrentBasketValue();
    const shipping = 0;
    const subtotal = basket?.basketItem.reduce((a,b)=>(b.price*b.quantity)+a,0);
    const total = subtotal! + shipping;
    this.basketTotalSource.next({shipping,total,subtotal});

  }

  incrementItemQuantity(item: BasketItem) {
    const basket = this.getCurrentBasketValue();
    const foundItemIndex = basket?.basketItem.findIndex(a => a.productId === item.productId);
    if (foundItemIndex !== undefined && foundItemIndex !== -1) {
      if (basket?.basketItem[foundItemIndex].quantity !== undefined) {
        basket.basketItem[foundItemIndex].quantity++;
        this.setBasket(basket);
      }
    }
  }
  
  decrementItemQuantity(item: BasketItem) {
    const basket = this.getCurrentBasketValue();
    
    if (basket) {
      const foundItemIndex = basket.basketItem.findIndex(a => a.productId === item.productId);
  
      if (foundItemIndex !== undefined && foundItemIndex !== -1) {
        if (basket.basketItem[foundItemIndex].quantity > 1) {
          basket.basketItem[foundItemIndex].quantity--;
          this.setBasket(basket);
        } else {
          this.removeItemFromBasket(item);
        }
      }
    }
  }
  
  deleteBasketItem(basketItemId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}Basket/${basketItemId}`);
}

  

removeItemFromBasket(item: BasketItem) {
  const basketItemId = item.basketItemId;

  if (basketItemId !== undefined) {
      this.deleteBasketItem(basketItemId).subscribe(
          () => {
              console.log('Item removed from the database');
              const basket = this.getCurrentBasketValue();

              if (basket?.basketItem.some(a => a.basketItemId == basketItemId)) {
                 
                  basket.basketItem = basket.basketItem.filter(i => i.basketItemId != basketItemId);

                  if (basket.basketItem.length > 0) {
                      this.setBasket(basket);
                  } else {
                      this.deleteBasket(basket);
                  }
              }
          },
          (error) => {
              console.error('Error removing item from the database:', error);
          }
      );
  }
}



  deleteBasket(basket: Basket) {
 return this.http.delete<Basket>(this.baseUrl+'Basket?id='+basket.customerId).subscribe(()=>{this.basketSource.next(null);
 this.basketTotalSource.next(null);
 localStorage.removeItem('basket_id');
},error=>{
  console.log(error)
});
  
  }
}
