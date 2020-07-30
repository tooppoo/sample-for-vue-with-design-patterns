import { CartItemList } from '@/views/cart/cart-item-list'
import { CartItemBuilder } from './cart-item-builder'

describe(CartItemList, () => {
  describe('totalPrice', () => {
    const builder = CartItemBuilder.create()

    describe.each([
      [
        CartItemList.valueOf([
          builder.itemPriceIs(1000).build(),
          builder.itemPriceIs(2000).build(),
          builder.itemPriceIs(3000).build()
        ]),
        6000
      ]
    ])(
      'when list is %p',
      (list: CartItemList, expected: number) => {
        it(`should return ${expected}`, () => {
          expect(list.totalPrice).toBe(expected)
        })
      }
    )
  })
})
