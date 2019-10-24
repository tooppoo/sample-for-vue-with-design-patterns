<template>
  <div class="loading">
    <h1>Loading Button</h1>
    <loading-state-selector-list
      :selectors="selectors"
      :selected="selected"
      @click="onClick"
    />
    <div
      class="button"
      @click="buttonBehavior.onClick"
    >
      {{ buttonBehavior.label }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import LoadingStateSelectorList from './LoadingStateSelectorList.vue'
import {
  Selector,
  ButtonBehavior,
  OnLoading,
  OnSuccess,
  OnFailed
} from './button-behavior'

@Component({
  components: {
    LoadingStateSelectorList
  }
})
export default class Loading extends Vue {
  selected: Selector = this.selectors[0]

  get selectors (): Selector[] {
    return [
      {
        label: 'Loading',
        value: 'loading'
      },
      {
        label: 'Success',
        value: 'success'
      },
      {
        label: 'Failed',
        value: 'failed'
      }
    ]
  }

  get buttonBehavior (): ButtonBehavior {
    switch (this.selected.value) {
      case 'loading':
        return new OnLoading()
      case 'success':
        return new OnSuccess()
      default:
        return new OnFailed()
    }
  }

  onClick (selected: Selector) {
    this.selected = selected
  }
}
</script>

<style scoped>
.button {
  background-color: aqua;
  width: 300px;
  padding: 20px;
  margin: auto;
}
</style>
