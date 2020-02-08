<template>
  <div class="loading">
    <h1>Loading Button</h1>
    <loading-state-selector-list
      :state-list="stateList"
      :selected="state.loadingState"
      @click="onSelect"
    />
    <button
      class="button"
      @click="onClick"
    >
      {{ buttonLabel }}
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import LoadingStateSelectorList from './LoadingStateSelectorList.vue'
import { LoadingStateList, State, StateList } from './model/state'
import {
  ButtonBehavior,
  OnLoading,
  OnSuccess,
  OnFailed
} from './model/button-behavior'
import {
  AppState,
  Interactor
} from './model/interaction'

const interactor = new Interactor()

@Component({
  components: {
    LoadingStateSelectorList
  }
})
export default class Loading extends Vue {
  state: AppState = interactor.initialize()

  get stateList (): StateList {
    return LoadingStateList
  }
  get buttonLabel (): string {
    return this.state.behavior.label
  }

  onSelect (selected: State) {
    this.state = interactor.selectStatus(selected, this.state)
  }
  onClick () {
    this.state.behavior.onClick()
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
