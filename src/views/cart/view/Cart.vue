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
import { CartInteraction } from '@/views/cart/controller/interaction'
import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'
import { CartItemList, CartItemListRepository, CartItem, CartItemCount } from '../model/cart-item-list'
import CartItemView from './CartItem.vue'

@Component({
  components: {
    CartItem: CartItemView
  }
})
export default class Cart extends Vue {
  @Prop({ required: true })
  private readonly repository!: CartItemListRepository

  private cartItems: CartItemList = this.interaction.cartItemList

  get interaction (): CartInteraction {
    return CartInteraction.create({ repository: this.repository })
  }

  created () {
    this.initialize()
  }

  @Watch('$route')
  async initialize () {
    this.handleUpdate(() => this.interaction.initialize())
  }

  get onlyBuyNow (): CartItemList {
    return this.cartItems.onlyBuyNow()
  }

  remove (cartItem: CartItem) {
    this.handleUpdate(() => this.interaction.remove(cartItem))
  }

  buyLater (cartItem: CartItem) {
    this.handleUpdate(() => this.interaction.buyLater(cartItem))
  }

  buyNow (cartItem: CartItem) {
    this.handleUpdate(() => this.interaction.buyNow(cartItem))
  }

  changeCount (cartItem: CartItem, newCount: CartItemCount) {
    this.handleUpdate(() => this.interaction.changeCount(cartItem, newCount))
  }

  private handleUpdate (command: () => Promise<void>) {
    command().then(() => {
      // リアクティブ検知のため、更新の都度再代入
      this.cartItems = this.interaction.cartItemList
    }).catch((error) => {
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
