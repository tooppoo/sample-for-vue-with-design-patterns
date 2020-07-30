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
        商品数: {{ onlyBuyNow.length }}点
      </div>
      <div
        class="cart-summary__price"
      >
        合計金額: {{ onlyBuyNow.totalPrice }}円
      </div>
    </div>
    <ul
      class="cart-item-list"
    >
      <cart-item
        class="cart-item-list__item"
        v-for="cartItem in cartItems.toArray()"
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
import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'
import { CartItemList, CartItemListRepository, CartItem, CartItemCount } from './cart-item-list'
import CartItemView from './CartItem.vue'

@Component({
  components: {
    CartItem: CartItemView
  }
})
export default class Cart extends Vue {
  @Prop({ required: true })
  private readonly repository!: CartItemListRepository

  private cartItems: CartItemList = CartItemList.initialize()

  created () {
    this.initialize()
  }

  @Watch('$route')
  async initialize () {
    this.cartItems = await this.repository.list()
  }

  get onlyBuyNow (): CartItemList {
    return this.cartItems.onlyBuyNow()
  }

  remove (cartItem: CartItem) {
    this.handleUpdateError(async () => {
      await this.repository.delete(cartItem)
      this.cartItems = this.cartItems.remove(cartItem)
    })
  }

  buyLater (cartItem: CartItem) {
    this.handleUpdateError(async () => {
      const updated = cartItem.buyLater()

      await this.repository.save(updated)

      this.cartItems = this.cartItems.replace(updated)
    })
  }

  buyNow (cartItem: CartItem) {
    this.handleUpdateError(async () => {
      const updated = cartItem.buyNow()

      await this.repository.save(updated)

      this.cartItems = this.cartItems.replace(updated)
    })
  }

  changeCount (cartItem: CartItem, newCount: CartItemCount) {
    this.handleUpdateError(async () => {
      const updated = cartItem.changeCount(newCount)

      await this.repository.save(updated)

      this.cartItems = this.cartItems.replace(updated)
    })
  }

  private handleUpdateError (command: () => Promise<void>) {
    command().catch((error) => {
      console.error({ error })

      alert(error.toString())
    })
  }
}
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
