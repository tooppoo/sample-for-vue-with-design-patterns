import { ButtonBehavior } from './button-behavior'

export type StateValue = 'loading' | 'success' | 'failed'
export interface LoadingState {
  readonly label: string
  readonly value: StateValue
  readonly isActivated: boolean
  readonly buttonBehavior: ButtonBehavior

  activate(): LoadingState
  inactivate(): LoadingState

  equals(other: LoadingState): boolean
}
type StateFactory = (bb: ButtonBehavior) => LoadingState
const buildState = (label: string, value: StateValue) => (buttonBehavior: ButtonBehavior) => BaseState.initialize(label, value, buttonBehavior)

export const Loading: StateFactory = buildState('Loading', 'loading')
export const Success: StateFactory = buildState('Success', 'success')
export const Failed: StateFactory = buildState('Failed', 'failed')

export class LoadingStateList {
  static create (states: readonly LoadingState[]): LoadingStateList {
    return new LoadingStateList(states)
  }

  private constructor (private readonly states: readonly LoadingState[]) { }

  get head (): LoadingState {
    return this.states[0]
  }

  find (finder: (s: LoadingState) => boolean): LoadingState | null {
    return this.states.find(finder) || null
  }

  activate (target: LoadingState): LoadingStateList {
    return new LoadingStateList(
      this.states.map(
        s => target.equals(s) ? target.activate() : s.inactivate()
      )
    )
  }

  toArray (): readonly LoadingState[] {
    return this.states
  }
}

export class BaseState implements LoadingState {
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
