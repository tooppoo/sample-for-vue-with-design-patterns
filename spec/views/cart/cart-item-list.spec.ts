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
      ],
      [
        CartItemList.valueOf([
          builder.itemPriceIs(1000).countIs(1).build(),
          builder.itemPriceIs(2000).countIs(2).build(),
          builder.itemPriceIs(3000).countIs(3).build()
        ]),
        14000
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
  describe('totalCount', () => {
    const builder = CartItemBuilder.create()

    describe.each([
      [
        CartItemList.valueOf([
          builder.countIs(1).build(),
          builder.countIs(1).build(),
          builder.countIs(1).build()
        ]),
        3
      ],
      [
        CartItemList.valueOf([
          builder.countIs(1).build(),
          builder.countIs(2).build(),
          builder.countIs(3).build()
        ]),
        6
      ]
    ])(
      'when list is %p',
      (list: CartItemList, expected: number) => {
        it(`should return ${expected}`, () => {
          expect(list.totalCount).toBe(expected)
        })
      }
    )
  })
})
