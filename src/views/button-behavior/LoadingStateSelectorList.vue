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

import { State } from './model/state'
import LoadingStateSelector from './LoadingStateSelector.vue'

@Component({
  components: {
    LoadingStateSelector
  }
})
export default class LoadingStateSelectorList extends Vue {
  @Prop({ required: true })
  stateList!: State[]

  @Prop({ required: true })
  selected!: State

  isSelected (target: State): boolean {
    return this.selected.value === target.value
  }

  @Emit('click')
  onClick (_selected: State) { }
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
