import { v4 as uuidv4 } from 'uuid';


export interface Basket {
  customerId: string;
  basketItem: BasketItem[];
}

  
  export interface BasketItem {
    basketItemId?: number
    productId:number
    productName: string
    price: number
    quantity: number
    picUrl: string
    brand: string
    category: string
    subCategory: string
  }
  

  export class ClBasket implements Basket {
    customerId=uuidv4();
    basketItem: BasketItem[] = [];
  }
  
export interface BasketTotals{
  shipping: number
  subtotal:number | undefined
  total:number
}