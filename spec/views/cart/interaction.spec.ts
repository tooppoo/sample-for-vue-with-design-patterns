import { CartItem, CartItemCount, CartItemList} from '@/views/cart/model/cart-item-list'
import { CartInteraction } from '@/views/cart/controller/interaction'
import { CartItemListRepository } from '@/views/cart/model/repository'
import { CartItemBuilder } from './cart-item-builder'

const builder = CartItemBuilder.create()
const item1 = builder.idIs('item-1').countIs(1).build().buyNow()
const item2 = builder.idIs('item-2').countIs(1).build().buyLater()
const item3 = builder.idIs('item-3').countIs(1).build().buyNow()

class TestRepository implements CartItemListRepository {
  readonly saved: CartItem[] = []
  readonly deleted: CartItem[] = []

  async list () {
    return CartItemList.valueOf([item1, item2, item3])
  }

  async save (cartItem: CartItem): Promise<void> {
    this.saved.push(cartItem)
  }

  async delete (cartItem: CartItem): Promise<void> {
    this.deleted.push(cartItem)
  }
}
describe(CartInteraction, () => {
  let repository: TestRepository
  let interaction: CartInteraction

  beforeEach(async () => {
    repository = new TestRepository()
    interaction = CartInteraction.create({ repository })

    await interaction.initialize()
  })

  describe('buyNow', () => {
    it('should replace target item as buy-now', async () => {
      await interaction.buyNow(item2)

      await expect(interaction.cartItemList).toStrictEqual(CartItemList.valueOf([
        item1,
        item2.buyNow(),
        item3
      ]))
    })
    it('should save via repository', async () => {
      await interaction.buyNow(item2)

      expect(repository.saved).toStrictEqual([item2.buyNow()])
    })
  })
  describe('buyLater', () => {
    it('should replace target item as buy-later', async () => {
      await interaction.buyLater(item3)

      await expect(interaction.cartItemList).toStrictEqual(CartItemList.valueOf([
        item1,
        item2,
        item3.buyLater()
      ]))
    })
    it('should save via repository', async () => {
      await interaction.buyLater(item3)

      expect(repository.saved).toStrictEqual([item3.buyLater()])
    })
  })
  describe('changeCount', () => {
    it('should update count in cart of target', async () => {
      await interaction.changeCount(item1, CartItemCount.valueOf(3))

      await expect(interaction.cartItemList).toStrictEqual(CartItemList.valueOf([
        item1.changeCount(CartItemCount.valueOf(3)),
        item2,
        item3
      ]))
    })
    it('should save via repository', async () => {
      await interaction.changeCount(item1, CartItemCount.valueOf(3))

      expect(repository.saved).toStrictEqual([item1.changeCount(CartItemCount.valueOf(3))])
    })
  })

  describe('remove', () => {
    it('should remove target', async () => {
      await interaction.remove(item1)

      await expect(interaction.cartItemList).toStrictEqual(CartItemList.valueOf([
        item2, item3
      ]))
    })
    it('should remove via repository', async () => {
      await interaction.remove(item1)

      expect(repository.deleted).toStrictEqual([item1])
    })
  })
})
