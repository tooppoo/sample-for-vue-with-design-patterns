import { CartItem, CartItemCount, CartItemList } from '@/views/cart/cart-item-list'
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
          expect(list.totalPayment).toBe(expected)
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
        CartItemCount.valueOf(3)
      ],
      [
        CartItemList.valueOf([
          builder.countIs(1).build(),
          builder.countIs(2).build(),
          builder.countIs(3).build()
        ]),
        CartItemCount.valueOf(6)
      ]
    ])(
      'when list is %p',
      (list: CartItemList, expected: CartItemCount) => {
        it(`should return ${expected}`, () => {
          expect(list.totalCount).toStrictEqual(expected)
        })
      }
    )
  })
  describe('replace', () => {
    const builder = CartItemBuilder.create()

    describe.each([
      [
        CartItemList.valueOf([
          builder.idIs('item1').build().buyNow(),
          builder.idIs('item2').build().buyNow(),
          builder.idIs('item3').build().buyNow()
        ]),
        builder.idIs('item2').build().buyLater(),
        CartItemList.valueOf([
          builder.idIs('item1').build().buyNow(),
          builder.idIs('item2').build().buyLater(),
          builder.idIs('item3').build().buyNow()
        ])
      ],
      [
        CartItemList.valueOf([
          builder.idIs('item1').build().buyNow(),
          builder.idIs('item2').build().buyNow(),
          builder.idIs('item3').build().buyNow()
        ]),
        builder.idIs('none').build().buyLater(),
        CartItemList.valueOf([
          builder.idIs('item1').build().buyNow(),
          builder.idIs('item2').build().buyNow(),
          builder.idIs('item3').build().buyNow()
        ])
      ]
    ])(
      'when list %s replace by %s',
      (list: CartItemList, target: CartItem, expected: CartItemList) => {
        it(`should return ${expected}`, () => {
          expect(list.replace(target)).toStrictEqual(expected)
        })
      }
    )
  })
  describe('onlyBuyNow', () => {
    const builder = CartItemBuilder.create()

    describe.each([
      [
        CartItemList.valueOf([
          builder.idIs('item1').build().buyNow(),
          builder.idIs('item2').build().buyNow(),
          builder.idIs('item3').build().buyNow()
        ]),
        CartItemList.valueOf([
          builder.idIs('item1').build().buyNow(),
          builder.idIs('item2').build().buyNow(),
          builder.idIs('item3').build().buyNow()
        ])
      ],
      [
        CartItemList.valueOf([
          builder.idIs('item1').build().buyNow(),
          builder.idIs('item2').build().buyLater(),
          builder.idIs('item3').build().buyNow()
        ]),
        CartItemList.valueOf([
          builder.idIs('item1').build().buyNow(),
          builder.idIs('item3').build().buyNow()
        ])
      ],
      [
        CartItemList.valueOf([
          builder.idIs('item1').build().buyLater(),
          builder.idIs('item2').build().buyLater(),
          builder.idIs('item3').build().buyLater()
        ]),
        CartItemList.valueOf([])
      ]
    ])(
      'when list is %s',
      (list: CartItemList, expected: CartItemList) => {
        it(`should return ${expected}`, () => {
          expect(list.onlyBuyNow()).toStrictEqual(expected)
        })
      }
    )
  })
})
