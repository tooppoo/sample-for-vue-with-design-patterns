import { ButtonBehavior } from '../button-behavior'
import { LoadingState, StateValue } from './loading-state'

export type StateFactory = (bb: ButtonBehavior) => LoadingState
export const buildState = (label: string, value: StateValue) =>
  (buttonBehavior: ButtonBehavior) =>
    BaseState.initialize(label, value, buttonBehavior)

class BaseState implements LoadingState {
  static initialize (label: string, value: StateValue, buttonBehavior: ButtonBehavior): LoadingState {
    return new BaseState(label, value, false, buttonBehavior)
  }

  private constructor (
    readonly label: string,
    readonly value: StateValue,
    readonly isActivated: boolean,
    readonly buttonBehavior: ButtonBehavior
  ) { }

  activate (): LoadingState {
    return new BaseState(this.label, this.value, true, this.buttonBehavior)
  }

  inactivate (): LoadingState {
    return new BaseState(this.label, this.value, false, this.buttonBehavior)
  }

  equals (other: LoadingState): boolean {
    return this.value === other.value
  }
}
