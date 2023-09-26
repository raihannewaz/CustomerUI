import { Address } from "./address"

export interface OrderToCreate {
    basketId: string
    deliveryMethodId: number
    shipToAddress: Address
  }

  export interface Order {
    orderId: number
    customerEmail: string
    orderDate: string
    shippingAddress: Address
    deliveryMethod: string
    shippingPrice: number
    orderItems: OrderItem[]
    subtotal: number
    total: number
    status: string
  }

  export interface OrderItem {
    productId: number
    productName: string
    productImage: string
    price: number
    quantity: number
  }