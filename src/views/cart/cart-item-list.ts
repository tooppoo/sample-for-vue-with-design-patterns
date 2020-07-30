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
      (total: number, cartItem: CartItem) => total + cartItem.price,
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
    return this.filter(cartItem => cartItem.willBuyNow)
  }

  remove (target: CartItem): CartItemList {
    return this.filter(stored => !stored.equals(target))
  }

  replace (target: CartItem): CartItemList {
    return new CartItemList(
      this.cartItems.map(cartItem => cartItem.equals(target) ? target : cartItem)
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
    private readonly state: CartItemState
  ) {}

  get id (): string {
    return this.item.id
  }

  get price (): number {
    return this.item.unitPrice.applyCount(this.count)
  }

  equals (other: CartItem): boolean {
    return this.id === other.id
  }

  get willBuyNow (): boolean {
    return this.state.buyNow
  }

  changeCount (count: CartItemCount): CartItem {
    return CartItem.valueOf({
      item: this.item,
      count,
      state: this.state
    })
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

  toString (): string {
    return `${this.value}`
  }
}

export class UnitPrice {
  static valueOf (value: number): UnitPrice {
    return new UnitPrice(value)
  }

  private constructor (private readonly value: number) {
    if (value < 0) {
      throw new Error(`price must be >= 0, but ${value}`)
    }
  }

  applyCount (count: CartItemCount): number {
    return this.value * count.toNumber()
  }

  toNumber (): number {
    return this.value
  }

  toString (): string {
    return `${this.value}`
  }
}

export interface CartItemState {
  buyNow: boolean
}

export interface Item {
  id: string
  image: string
  name: string
  unitPrice: UnitPrice
}
