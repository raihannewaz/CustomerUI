
export interface Basket {
    customerBasketId: number
    customerId: string
    basketItem: BasketItem[]
  }
  
  export interface BasketItem {
    basketItemId: number
    productName: string
    price: number
    quantity: number
    picUrl: string
    brand: string
    category: string
    subCategory: string
    customerBasketId: number
  }
  

export class ClBasket implements Basket {
    customerBasketId!: number
    customerId!: string
    basketItem!: BasketItem[]
    
}
