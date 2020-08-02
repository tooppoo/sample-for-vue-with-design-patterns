<template>
  <ul class="loading-state-list">
    <loading-state-selector
      v-for="s in stateList.toArray()"
      :key="s.value"
      name="loading"
      :state="s"
      @click="onClick"
    >
      {{ s.value }}
    </loading-state-selector>
  </ul>
</template>

<script lang="ts">
import { LoadingStateList } from '@/views/button-behavior/model/loading-state/state-list'
import Vue from 'vue'
import { Component, Emit, Prop } from 'vue-property-decorator'

import { LoadingState } from '../model/loading-state/loading-state'
import LoadingStateSelector from './LoadingStateSelector.vue'

@Component({
  components: {
    LoadingStateSelector
  }
})
export default class LoadingStateSelectorList extends Vue {
  @Prop({ required: true })
  stateList!: LoadingStateList

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
