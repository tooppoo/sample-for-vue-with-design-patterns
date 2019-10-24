<template>
  <ul class="loading-state-list">
    <loading-state-selector
      v-for="s in selectors"
      :key="s.value"
      name="loading"
      :selector="s"
      :selected="isSelected(s)"
      @click="onClick"
    >
      {{ s.value }}
    </loading-state-selector>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Emit, Prop } from 'vue-property-decorator'

import LoadingStateSelector from './LoadingStateSelector.vue'
import { Selector } from './button-behavior'

@Component({
  components: {
    LoadingStateSelector
  }
})
export default class LoadingStateSelectorList extends Vue {
  @Prop({ required: true })
  selectors!: Selector[]

  @Prop({ required: true })
  selected!: Selector

  isSelected (target: Selector): boolean {
    return this.selected.value === target.value
  }

  @Emit('click')
  onClick (_selected: Selector) { }
}
</script>

<style scoped>
.loading-state-list {
  display: flex;
  justify-content: center;
  list-style: none;
  padding: 0;
}
</style>
