<template>
  <li
    class="cart-item"
  >
    {{ item.name }}: {{ item.price }}円
    <div
      class="cart-item__image"
      :style="itemImageClass"
    />
    <div
      class="cart-item__editor"
    >
      <label class="cart-item__editor__count">
        <input
          class="cart-item__editor__count__value"
          type="number"
          min="0"
          :value="count"
          @change="onChangeCount($event.target.value)"
        >個
      </label>
      <button
        @click="onRemove(cartItem)"
      >
        カートから取り除く
      </button>
      <button
        v-if="willPurchase"
        @click="onBuyLater(cartItem)"
      >
        後で買う
      </button>
      <button
        v-else
        @click="onBuyNow(cartItem)"
      >
        今すぐ買う
      </button>
    </div>
  </li>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Emit, Prop } from 'vue-property-decorator'
import { CartItem, CartItemCount, Item } from './cart-item-list'

@Component
export default class CartItemView extends Vue {
  @Prop({ required: true })
  cartItem!: CartItem

  get willPurchase (): boolean {
    return this.cartItem.willBuyNow
  }

  get count (): number {
    return this.cartItem.count.toNumber()
  }

  get item (): Item {
    return this.cartItem.item
  }

  get itemImageClass (): object {
    const base = {
      'background-image': `url(${this.item.image})`,
      'background-position': 'center',
      'background-repeat': 'no-repeat',
      'background-size': 'contain',
      width: '300px',
      height: '300px'
    }

    if (this.willPurchase) {
      return base
    }

    return {
      ...base,
      'background-color': 'lightgray',
      'background-blend-mode': 'multiply'
    }
  }

  @Emit('remove')
  onRemove (_item: CartItem) { }

  @Emit('buy-later')
  onBuyLater (_item: CartItem) { }

  @Emit('buy-now')
  onBuyNow (_item: CartItem) { }

  onChangeCount (newCount: string) {
    this.emitChangeCount(
      this.cartItem,
      CartItemCount.valueOf(parseInt(newCount, 10))
    )
  }

  @Emit('change-count')
  emitChangeCount (_item: CartItem, _newCount: CartItemCount) { }
}
</script>

<style scoped>
.cart-item {
  font-size: 24px;
  list-style: none;
  width: 300px;
}
.cart-item__editor__count {
  display: flex;
  justify-content: center;
  align-items: center;
}
.cart-item__editor__count__value {
  font-size: 20px;
  width: 100px;
}
button {
  font-size: 20px;
  width: 220px;
}
</style>
