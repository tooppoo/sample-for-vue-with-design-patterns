<template>
  <li
    class="loading-state-selector"
  >
    <div>
      <slot />
    </div>
    <input
      type="radio"
      :value="selector.value"
      :name="selector.name"
      :checked="selected"
      @input="onClick(selector)"
    >
  </li>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Emit, Prop } from 'vue-property-decorator'
import { Selector } from './button-behavior'

@Component
export default class LoadingStateSelector extends Vue {
  @Prop({ required: true })
  selector!: Selector

  @Prop({ default: false })
  selected!: boolean

  @Emit('click')
  onClick (_value: Selector) {

  }
}
</script>

<style scoped>
.loading-state-selector {
  width: 100px;
}
</style>
