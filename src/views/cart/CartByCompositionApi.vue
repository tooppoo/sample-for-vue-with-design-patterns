<template>
  <div
    class="cart"
  >
    <div
      class="cart-summary"
    >
      <div
        class="cart-summary__item-count"
      >
        商品数: {{ onlyBuyNow.totalCount }}点
      </div>
      <div
        class="cart-summary__price"
      >
        合計金額: {{ onlyBuyNow.totalPayment }}円
      </div>
    </div>
    <ul
      class="cart-item-list"
    >
      <cart-item
        class="cart-item-list__item"
        v-for="cartItem in state.cartItems.toArray()"
        :key="cartItem.id"
        :cartItem="cartItem"
        @remove="remove"
        @buy-later="buyLater"
        @buy-now="buyNow"
        @change-count="changeCount"
      />
    </ul>
  </div>
</template>

<script lang="ts">
import { CartInteraction } from '@/views/cart/interaction'
import { computed, defineComponent, reactive } from '@vue/composition-api'
import { PropType } from 'vue'
import { CartItemListRepository, CartItem, CartItemCount } from './cart-item-list'
import CartItemView from './CartItem.vue'

type Props = {
  repository: CartItemListRepository
}
export default defineComponent({
  name: 'Cart',
  components: {
    CartItem: CartItemView
  },
  props: {
    repository: Object as PropType<CartItemListRepository>
  } as any, // anyにしないと型エラーになる...何かミスってそう
  setup (props: Props) {
    const interaction = CartInteraction.create({ repository: props.repository })
    const state = reactive({
      cartItems: interaction.cartItemList
    })

    const handleUpdate = (command: () => Promise<void>) => {
      command().then(() => {
        // リアクティブ検知のため、更新の都度再代入
        state.cartItems = interaction.cartItemList
      }).catch((error) => {
        console.error({ error })

        alert(error.toString())
      })
    }
    const handleWithOnlyItem = (command: (item: CartItem) => Promise<void>) => (item: CartItem) =>
      handleUpdate(() => command(item))

    const buyNow = handleWithOnlyItem(item => interaction.buyNow(item))
    const buyLater = handleWithOnlyItem(item => interaction.buyLater(item))
    const remove = handleWithOnlyItem(item => interaction.remove(item))

    const changeCount = (item: CartItem, newCount: CartItemCount) =>
      handleUpdate(() => interaction.changeCount(item, newCount))
    const onlyBuyNow = computed(() => state.cartItems.onlyBuyNow())

    handleUpdate(() => interaction.initialize())

    return {
      state,
      onlyBuyNow,
      buyNow,
      buyLater,
      remove,
      changeCount
    }
  }
})
</script>

<style scoped>
.cart-summary {
  border-width: 3px;
  border-style: solid;
  margin-bottom: 30px;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
  width: 600px;
}
.cart-summary__item-count {
  font-size: 24px;
}
.cart-summary__price {
  font-size: 24px;
}
.cart-item-list {
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  width: 600px;
}
.cart-item-list__item {
  margin-bottom: 20px;
}
</style>
