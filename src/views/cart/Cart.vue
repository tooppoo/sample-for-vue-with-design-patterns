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
        商品数: {{ cartItemsWillPurchase.length }}点
      </div>
      <div
        class="cart-summary__price"
      >
        合計金額: {{ cartItemsWillPurchase.totalPrice }}円
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
      />
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'
import { CartItemList, CartItemListRepository, CartItem } from './cart-item-list'
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

  get cartItemsWillPurchase (): CartItemList {
    return this.cartItems.onlyWillPurchase()
  }

  remove (cartItem: CartItem) {
    this.cartItems = this.cartItems.remove(cartItem.item)
  }

  buyLater (cartItem: CartItem) {
    this.cartItems = this.cartItems.buyLater(cartItem.item)
  }

  buyNow (cartItem: CartItem) {
    this.cartItems = this.cartItems.buyNow(cartItem.item)
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
