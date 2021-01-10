import { CartItemListRepository } from '@/views/cart/model/repository'
import { CartItemList, CartItem, CartItemCount, UnitPrice } from '../cart-item-list'

export class OnMemoryCartItemListRepository implements CartItemListRepository {
  private _list = CartItemList.valueOf([
    CartItem.valueOf({
      item: {
        id: 'cup-noodle',
        image: 'https://1.bp.blogspot.com/-oTMkckUVbRo/XT_Lb4t5ONI/AAAAAAABT6M/vXST7HLpgPU4elBVqIQVuof9Ui4-5PUYwCLcBGAs/s800/food_cup_ra-men_close.png',
        name: 'カップラーメン',
        unitPrice: UnitPrice.valueOf(180)
      },
      count: CartItemCount.valueOf(1),
      state: { buyNow: true }
    }),
    CartItem.valueOf({
      item: {
        id: 'baked-cake-fish-tube',
        image: 'https://3.bp.blogspot.com/-0cxQy6x5pk0/WyH_0OKogUI/AAAAAAABMtI/ndUgGKr7P1sbNKKR1cFegNk90zTxyLv_gCLcBGAs/s800/food_yaki_chikuwa.png',
        name: '焼き竹輪',
        unitPrice: UnitPrice.valueOf(100)
      },
      count: CartItemCount.valueOf(1),
      state: { buyNow: true }
    }),
    CartItem.valueOf({
      item: {
        id: 'whisky',
        image: 'https://4.bp.blogspot.com/-0blALkNdKAg/W8BOQd0NHcI/AAAAAAABPXQ/T9Fdxh6R_DQSO6ncVIVBbYtBBf5rbWUZgCLcBGAs/s800/drink_whisky_irish.png',
        name: 'ウィスキー',
        unitPrice: UnitPrice.valueOf(5000)
      },
      count: CartItemCount.valueOf(1),
      state: { buyNow: true }
    }),
    CartItem.valueOf({
      item: {
        id: 'miso-soup',
        image: 'https://2.bp.blogspot.com/-bznPJlS0rUQ/Wm1ylMeQrzI/AAAAAAABJ6E/xMvem7AfbcUiUtpAVP92Iabml8a6r7ruQCLcBGAs/s800/food_misoshiru_asari.png',
        name: '味噌汁',
        unitPrice: UnitPrice.valueOf(300)
      },
      count: CartItemCount.valueOf(1),
      state: { buyNow: true }
    })
  ])

  async list (): Promise<CartItemList> {
    return this._list
  }

  async save (cartItem: CartItem): Promise<void> {
    this._list.replace(cartItem)
  }

  async delete (cartItem: CartItem): Promise<void> {
    this._list.remove(cartItem)
  }
}
