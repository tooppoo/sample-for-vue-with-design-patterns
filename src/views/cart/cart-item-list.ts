export interface CartItemListRepository {
  list(): Promise<CartItemList>
}

export class CartItemList {
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

  find (item: Item): Item | null {
    return this.findBy(cartItem => cartItem.id === item.id)
  }

  findBy (finder: (item: Item) => boolean): Item | null {
    const target = this.cartItems.find(itemInCart => finder(itemInCart.item))

    return target ? target.item : null
  }

  filter (filter: (item: Item) => boolean): CartItemList {
    return this.filterInner(cartItem => filter(cartItem.item))
  }

  onlyWillPurchase (): CartItemList {
    return this.filterInner(cartItem => cartItem.state.willPurchase)
  }

  add (item: Item): CartItemList {
    return this.addInner({
      item,
      state: {
        willPurchase: true
      }
    })
  }

  remove (item: Item): CartItemList {
    return this.filter(itemInCart => itemInCart.id !== item.id)
  }

  buyLater (item: Item): CartItemList {
    return this.changeState(item, {
      willPurchase: false
    })
  }

  buyNow (item: Item): CartItemList {
    return this.changeState(item, {
      willPurchase: true
    })
  }

  toArray (): CartItem[] {
    return [...this.cartItems] // shallow copy
  }

  private filterInner (filter: (cartItem: CartItem) => boolean): CartItemList {
    return new CartItemList(
      this.cartItems.filter(filter)
    )
  }

  private toIdList (): string[] {
    return this.cartItems.map(cartItem => cartItem.item.id)
  }

  private addInner (cartItem: CartItem): CartItemList {
    return new CartItemList([
      ...this.cartItems,
      cartItem
    ])
  }

  private orderById (ids: string[]): CartItemList {
    return new CartItemList(
      ids.reduce<CartItem[]>(
        (list, nextId) => {
          const target = this.cartItems.find(cartItem => cartItem.item.id === nextId)

          if (!target) {
            return list
          }

          return [...list, target]
        },
        []
      )
    )
  }

  private changeState (item: Item, state: CartItemState): CartItemList {
    const target = this.find(item)

    if (!target) {
      return this
    }

    return this
      .remove(item)
      .addInner({
        item,
        state
      })
      .orderById(this.toIdList())
  }
}

export interface CartItem {
  item: Item
  state: CartItemState
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
