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
      :disabled="buttonIsDisable"
    >
      {{ buttonLabel }}
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import LoadingStateSelectorList from './LoadingStateSelectorList.vue'
import { State, StateList } from './model/state'
import {
  AppState
} from './model'
import { Interactor } from './app/interactor'
import { ButtonBehavior } from './model/button-behavior'

@Component({
  components: {
    LoadingStateSelectorList
  }
})
export default class Loading extends Vue {
  @Prop({ default: () => new Interactor() })
  interactor!: Interactor

  state: AppState = this.interactor.initialize()

  get stateList (): StateList {
    return this.state.states
  }
  get currentState (): State {
    return this.interactor.currentState(this.state)
  }
  get buttonBehavior (): ButtonBehavior {
    return this.currentState.buttonBehavior
  }
  get buttonLabel (): string {
    return this.buttonBehavior.label
  }
  get buttonIsDisable (): boolean {
    return this.buttonBehavior.isDisable
  }

  onSelect (selected: State) {
    this.state = this.interactor.selectStatus(selected, this.state)
  }
  onClick () {
    this.buttonBehavior.onClick()
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
.button[disabled] {
  background-color: gray;
  color: white;
}
</style>
