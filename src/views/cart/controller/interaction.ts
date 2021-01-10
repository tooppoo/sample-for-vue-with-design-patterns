import { CartItem, CartItemCount, CartItemList} from '@/views/cart/model/cart-item-list'
import { CartItemListRepository } from '@/views/cart/model/repository'

export class CartInteraction {
  static create ({ repository }: { repository: CartItemListRepository }): CartInteraction {
    return new CartInteraction(repository)
  }

  private list: CartItemList = CartItemList.empty()

  private constructor (private readonly repository: CartItemListRepository) {}

  get cartItemList (): CartItemList {
    return this.list
  }

  async initialize (): Promise<void> {
    this.list = await this.repository.list()
  }

  async buyNow (target: CartItem): Promise<void> {
    await this.tryUpdate(target.buyNow())
  }

  async buyLater (target: CartItem): Promise<void> {
    await this.tryUpdate(target.buyLater())
  }

  async changeCount (target: CartItem, newCount: CartItemCount): Promise<void> {
    await this.tryUpdate(target.changeCount(newCount))
  }

  async remove (target: CartItem): Promise<void> {
    await this.repository.delete(target)

    this.list = this.list.remove(target)
  }

  private async tryUpdate (target: CartItem) {
    await this.repository.save(target)

    this.list = this.list.replace(target)
  }
}
