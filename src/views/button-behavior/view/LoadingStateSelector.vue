<template>
  <li
    class="loading-state-selector"
  >
    <div>
      <slot />
    </div>
    <label>
      <input
        type="radio"
        :value="state.value"
        :name="name"
        :checked="isChecked"
        @input="onClick(state)"
      >
    </label>
  </li>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Emit, Prop } from 'vue-property-decorator'
import { LoadingState } from '../model/loadint-state'

@Component
export default class LoadingStateSelector extends Vue {
  @Prop({ required: true })
  state!: LoadingState

  @Prop({ required: true })
  name!: string

  @Emit('click')
  onClick (value: LoadingState) {
    return value
  }

  get isChecked (): boolean {
    return this.state.isActivated
  }
}
</script>

<style scoped>
.loading-state-selector {
  width: 100px;
}
</style>
