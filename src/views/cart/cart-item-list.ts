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
      (total: number, cartItem: CartItem) => total + (cartItem.item.price * cartItem.count.toNumber()),
      0
    )
  }

  get totalCount (): number {
    return this.cartItems.reduce(
      (total: number, cartItem: CartItem) => total + cartItem.count.toNumber(),
      0
    )
  }

  get length (): number {
    return this.cartItems.length
  }

  onlyBuyNow (): CartItemList {
    return this.filter(cartItem => cartItem.state.buyNow)
  }

  remove (cartItem: CartItem): CartItemList {
    return this.filter(stored => stored.id !== cartItem.id)
  }

  replace (target: CartItem): CartItemList {
    return new CartItemList(
      this.cartItems.map(cartItem => cartItem.id === target.id ? target : cartItem)
    )
  }

  toArray (): CartItem[] {
    return [...this.cartItems] // shallow copy
  }

  private filter (filter: (cartItem: CartItem) => boolean): CartItemList {
    return new CartItemList(
      this.cartItems.filter(filter)
    )
  }
}

export class CartItem {
  static valueOf (
    { item, count, state }: { item: Item, count: CartItemCount, state: CartItemState }
  ): CartItem {
    return new CartItem(item, count, state)
  }

  private constructor (
    readonly item: Item,
    readonly count: CartItemCount,
    readonly state: CartItemState
  ) {}

  get id (): string {
    return this.item.id
  }

  buyNow (): CartItem {
    return CartItem.valueOf({
      item: this.item,
      count: this.count,
      state: {
        buyNow: true
      }
    })
  }

  buyLater (): CartItem {
    return CartItem.valueOf({
      item: this.item,
      count: this.count,
      state: {
        buyNow: false
      }
    })
  }
}

export class CartItemCount {
  static valueOf (value: number): CartItemCount {
    return new CartItemCount(value)
  }

  private constructor (private readonly value: number) {
    if (value < 0) {
      throw new Error(`cart item count must be >= 0, but ${value}`)
    }
  }

  toNumber (): number {
    return this.value
  }
}

export interface CartItemState {
  buyNow: boolean
}

export interface Item {
  id: string
  image: string
  name: string
  price: number
}
