<template>
  <ul class="loading-state-list">
    <loading-state-selector
      v-for="s in stateList"
      :key="s.value"
      name="loading"
      :state="s"
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

import { LoadingState } from './interaction'
import LoadingStateSelector from './LoadingStateSelector.vue'

@Component({
  components: {
    LoadingStateSelector
  }
})
export default class LoadingStateSelectorList extends Vue {
  @Prop({ required: true })
  stateList!: LoadingState[]

  @Prop({ required: true })
  selected!: LoadingState

  isSelected (target: LoadingState): boolean {
    return this.selected.value === target.value
  }

  @Emit('click')
  onClick (_selected: LoadingState) { }
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
