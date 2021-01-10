import { CartItem, CartItemList } from '@/views/cart/model/cart-item-list'

export interface CartItemListRepository {
  list(): Promise<CartItemList>

  save(cartItem: CartItem): Promise<void>

  delete(cartItem: CartItem): Promise<void>
}
