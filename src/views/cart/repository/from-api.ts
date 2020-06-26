import { CartItemListRepository, CartItemList } from '../cart-item-list'

interface CartItemResponse {
  id: string
  image_url: string
  product_name: string
  unit_price: number
  will_purchase: boolean
}

export class FromApiCartItemListRepository implements CartItemListRepository {
  async list (): Promise<CartItemList> {
    const response = await fetch('http://localhost:8090/cart_items')
    const responseItems: CartItemResponse[] = await response.json()

    return this.convertResponseToDomainObject(responseItems)
  }

  private convertResponseToDomainObject (responseItems: CartItemResponse[]): CartItemList {
    return CartItemList.valueOf(
      responseItems.map(item => ({
        item: {
          id: item.id,
          name: item.product_name,
          price: item.unit_price,
          image: item.image_url
        },
        state: {
          willPurchase: item.will_purchase
        }
      }))
    )
  }
}
