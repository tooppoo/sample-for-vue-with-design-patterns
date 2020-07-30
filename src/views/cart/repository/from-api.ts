import { CartItemListRepository, CartItemList, CartItem } from '../cart-item-list'

interface CartItemResponse {
  id: string
  image_url: string
  product_name: string
  unit_price: number
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
        unit_price: cartItem.item.price,
        will_purchase: cartItem.state.buyNow
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
          price: item.unit_price,
          image: item.image_url
        },
        state: {
          buyNow: item.will_purchase
        }
      }))
    )
  }
}
