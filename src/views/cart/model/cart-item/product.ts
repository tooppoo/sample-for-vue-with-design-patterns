import { UnitPrice } from '@/views/cart/model/cart-item-list'

export interface Product {
  id: string
  image: string
  name: string
  unitPrice: UnitPrice
}
