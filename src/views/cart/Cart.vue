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
import { Component } from 'vue-property-decorator'
import { CartItemList, Item } from './cart-item-list'
import CartItem from './CartItem.vue'

@Component({
  components: {
    CartItem
  }
})
export default class Cart extends Vue {
  cartItems = CartItemList.initialize()
    .add({
      id: 'cup-noodle',
      image: 'https://1.bp.blogspot.com/-oTMkckUVbRo/XT_Lb4t5ONI/AAAAAAABT6M/vXST7HLpgPU4elBVqIQVuof9Ui4-5PUYwCLcBGAs/s800/food_cup_ra-men_close.png',
      name: 'カップラーメン',
      price: 180
    })
    .add({
      id: 'baked-cake-fish-tube',
      image: 'https://3.bp.blogspot.com/-0cxQy6x5pk0/WyH_0OKogUI/AAAAAAABMtI/ndUgGKr7P1sbNKKR1cFegNk90zTxyLv_gCLcBGAs/s800/food_yaki_chikuwa.png',
      name: '焼き竹輪',
      price: 100
    })
    .add({
      id: 'whisky',
      image: 'https://4.bp.blogspot.com/-0blALkNdKAg/W8BOQd0NHcI/AAAAAAABPXQ/T9Fdxh6R_DQSO6ncVIVBbYtBBf5rbWUZgCLcBGAs/s800/drink_whisky_irish.png',
      name: 'ウィスキー',
      price: 5000
    })
    .add({
      id: 'miso-soup',
      image: 'https://2.bp.blogspot.com/-bznPJlS0rUQ/Wm1ylMeQrzI/AAAAAAABJ6E/xMvem7AfbcUiUtpAVP92Iabml8a6r7ruQCLcBGAs/s800/food_misoshiru_asari.png',
      name: '味噌汁',
      price: 300
    })

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
