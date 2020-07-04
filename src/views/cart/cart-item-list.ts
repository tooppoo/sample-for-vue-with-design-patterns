export interface CartItemListRepository {
  list(): Promise<CartItemList>

  save(cartItem: CartItem): Promise<void>

  delete(cartItem: CartItem): Promise<void>
}

export class CartItemList {
  static valueOf (items: CartItem[]): CartItemList {
    return new CartItemList(items)
  }

  static initialize (): CartItemList {
    return new CartItemList([])
  }

  private constructor (private readonly cartItems: CartItem[]) { }

  get totalPrice (): number {
    return this.cartItems.reduce(
      (total: number, cartItem: CartItem) => total + cartItem.item.price,
      0
    )
  }

  get length (): number {
    return this.cartItems.length
  }

  onlyWillPurchase (): CartItemList {
    return this.filter(cartItem => cartItem.state.willPurchase)
  }

  remove (cartItem: CartItem): CartItemList {
    return this.filter(stored => stored.id !== cartItem.id)
  }

  replace (cartItem: CartItem): CartItemList {
    return this.changeState(cartItem.item, cartItem.state)
  }

  toArray (): CartItem[] {
    return [...this.cartItems] // shallow copy
  }

  private filter (filter: (cartItem: CartItem) => boolean): CartItemList {
    return new CartItemList(
      this.cartItems.filter(filter)
    )
  }

  private changeState (item: Item, state: CartItemState): CartItemList {
    return new CartItemList(
      this.cartItems.map(cartItem => cartItem.item.id === item.id
        ? CartItem.valueOf({ item, state })
        : cartItem
      )
    )
  }
}

export class CartItem {
  static valueOf (
    { item, state }: { item: Item, state: CartItemState }
  ): CartItem {
    return new CartItem(item, state)
  }

  private constructor (
    readonly item: Item,
    readonly state: CartItemState
  ) {}

  get id (): string {
    return this.item.id
  }

  buyNow (): CartItem {
    return CartItem.valueOf({
      item: this.item,
      state: {
        willPurchase: true
      }
    })
  }

  buyLater (): CartItem {
    return CartItem.valueOf({
      item: this.item,
      state: {
        willPurchase: false
      }
    })
  }
}
export interface CartItemState {
  willPurchase: boolean
}

export interface Item {
  id: string
  image: string
  name: string
  price: number
}
