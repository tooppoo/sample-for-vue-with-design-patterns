import { ButtonBehavior } from './button-behavior'

export type StateValue = 'loading' | 'success' | 'failed'
export interface State {
  readonly label: string
  readonly value: StateValue
  readonly isActivated: boolean
  readonly buttonBehavior: ButtonBehavior

  activate(): State
  inactivate(): State

  equals(other: State): boolean
}
type StateFactory = (bb: ButtonBehavior) => State
const buildState = (label: string, value: StateValue) => (buttonBehavior: ButtonBehavior) => BaseState.initialize(label, value, buttonBehavior)

export const Loading: StateFactory = buildState('Loading', 'loading')
export const Success: StateFactory = buildState('Success', 'success')
export const Failed: StateFactory = buildState('Failed', 'failed')

export class StateList {
  static create (states: readonly State[]): StateList {
    return new StateList(states)
  }
  private constructor (private readonly states: readonly State[]) { }

  get head (): State {
    return this.states[0]
  }

  find (finder: (s: State) => boolean): State | null {
    return this.states.find(finder) || null
  }

  activate (target: State): StateList {
    return new StateList(
      this.states.map(
        s => target.equals(s) ? target.activate() : s.inactivate()
      )
    )
  }

  toArray (): readonly State[] {
    return this.states
  }
}

export class BaseState implements State {
  static initialize (label: string, value: StateValue, buttonBehavior: ButtonBehavior): State {
    return new BaseState(label, value, false, buttonBehavior)
  }
  private constructor (
    readonly label: string,
    readonly value: StateValue,
    readonly isActivated: boolean,
    readonly buttonBehavior: ButtonBehavior
  ) { }

  activate (): State {
    return new BaseState(this.label, this.value, true, this.buttonBehavior)
  }
  inactivate (): State {
    return new BaseState(this.label, this.value, false, this.buttonBehavior)
  }
  equals (other: State): boolean {
    return this.value === other.value
  }
}
