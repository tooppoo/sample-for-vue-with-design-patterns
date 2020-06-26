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
        :key="cartItem.item.id"
        :item="cartItem.item"
        :will-purchase="cartItem.state.willPurchase"
        @remove="remove"
        @buy-later="buyLater"
        @buy-now="buyNow"
      />
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { CartItemList, Item, CartItemListRepository } from './cart-item-list'
import CartItem from './CartItem.vue'

@Component({
  components: {
    CartItem
  }
})
export default class Cart extends Vue {
  @Prop({ required: true })
  private readonly repository!: CartItemListRepository

  private cartItems: CartItemList = CartItemList.initialize()

  async created () {
    this.cartItems = await this.repository.list()
  }

  get cartItemsWillPurchase (): CartItemList {
    return this.cartItems.onlyWillPurchase()
  }

  remove (item: Item) {
    this.cartItems = this.cartItems.remove(item)
  }

  buyLater (item: Item) {
    this.cartItems = this.cartItems.buyLater(item)
  }

  buyNow (item: Item) {
    this.cartItems = this.cartItems.buyNow(item)
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
