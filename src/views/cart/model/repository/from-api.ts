import { CartItemListRepository } from '@/views/cart/model/repository'
import { CartItemList, CartItem, CartItemCount, UnitPrice } from '../cart-item-list'

interface CartItemResponse {
  id: string
  image_url: string
  product_name: string
  unit_price: number
  unit_count: number
  will_purchase: boolean
}

export class FromApiCartItemListRepository implements CartItemListRepository {
  constructor (
    private readonly baseUrl: string = 'http://localhost:8090/cart_items'
  ) {}

  async list (): Promise<CartItemList> {
    const response = await fetch(this.baseUrl)
    const responseItems: CartItemResponse[] = await response.json()

    return this.convertResponseToDomainObject(responseItems)
  }

  async save (cartItem: CartItem): Promise<void> {
    await fetch(`${this.baseUrl}/${cartItem.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: cartItem.id,
        image_url: cartItem.item.image,
        product_name: cartItem.item.name,
        unit_price: cartItem.item.unitPrice,
        unit_count: cartItem.count.toNumber(),
        will_purchase: cartItem.willBuyNow
      })
    })
  }

  async delete (cartItem: CartItem): Promise<void> {
    await fetch(`${this.baseUrl}/${cartItem.id}`, {
      method: 'DELETE'
    })
  }

  private convertResponseToDomainObject (responseItems: CartItemResponse[]): CartItemList {
    return CartItemList.valueOf(
      responseItems.map(item => CartItem.valueOf({
        item: {
          id: item.id,
          name: item.product_name,
          unitPrice: UnitPrice.valueOf(item.unit_price),
          image: item.image_url
        },
        count: CartItemCount.valueOf(item.unit_count),
        state: {
          buyNow: item.will_purchase
        }
      }))
    )
  }
}
