import { CartItem, CartItemCount, CartItemState, Item } from '@/views/cart/cart-item-list'

export class CartItemBuilder {
  static create (): CartItemBuilder {
    return new CartItemBuilder(
      {
        id: 'test',
        name: 'てすと',
        image: 'image.png',
        price: 1000
      },
      CartItemCount.valueOf(1),
      {
        buyNow: true
      }
    )
  }

  private constructor (
    private item: Item,
    private count: CartItemCount,
    private state: CartItemState
  ) { }

  itemPriceIs (price: number): CartItemBuilder {
    return new CartItemBuilder(
      {
        ...this.item,
        price
      },
      this.count,
      this.state
    )
  }

  countIs (count: number): CartItemBuilder {
    return new CartItemBuilder(
      this.item,
      CartItemCount.valueOf(count),
      this.state
    )
  }

  stateIs (state: CartItemState): CartItemBuilder {
    return new CartItemBuilder(
      this.item,
      this.count,
      state
    )
  }

  build (): CartItem {
    return CartItem.valueOf({
      item: this.item,
      state: this.state
    })
  }
}
