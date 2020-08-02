<template>
  <div class="loading">
    <h1>Loading Button</h1>
    <loading-state-selector-list
      :state-list="stateList"
      :selected="state.states"
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
import { LoadingStateList } from '@/views/button-behavior/model/state-list'
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import LoadingStateSelectorList from './LoadingStateSelectorList.vue'
import { LoadingState } from '../model/state'
import {
  AppState
} from '../model'
import { Interaction } from '../controller/interaction'
import { ButtonBehavior } from '../model/button-behavior'

@Component({
  components: {
    LoadingStateSelectorList
  }
})
export default class Loading extends Vue {
  @Prop({ default: () => new Interaction() })
  interaction!: Interaction

  state: AppState = this.interaction.initialize()

  get stateList (): LoadingStateList {
    return this.state.states
  }

  get currentState (): LoadingState {
    return this.interaction.currentState(this.state)
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

  onSelect (selected: LoadingState) {
    this.state = this.interaction.selectStatus(selected, this.state)
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
