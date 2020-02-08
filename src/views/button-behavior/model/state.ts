type LoadingStateValue = 'loading' | 'success' | 'failed'
export interface State {
  readonly label: string
  readonly value: LoadingStateValue
  readonly isActivated: boolean

  activate(): State
  inactivate(): State

  equals(other: State): boolean
}

export class StateList {
  static create (states: readonly [State, ...State[]]): StateList {
    return new StateList(states)
  }
  private constructor (private readonly states: readonly [State, ...State[]]) { }

  get head (): State {
    return this.states[0]
  }

  toArray (): readonly [State, ...State[]] {
    return this.states
  }
}

class BaseLoadingState implements State {
  static initialize (label: string, value: LoadingStateValue): State {
    return new BaseLoadingState(label, value, false)
  }
  private constructor (
    readonly label: string,
    readonly value: LoadingStateValue,
    readonly isActivated: boolean
  ) { }

  activate (): State {
    return new BaseLoadingState(this.label, this.value, true)
  }
  inactivate (): State {
    return new BaseLoadingState(this.label, this.value, false)
  }
  equals (other: State): boolean {
    return this.value === other.value
  }
}

export const LoadingStateList: StateList = StateList.create([
  BaseLoadingState.initialize('Loading', 'loading').activate(),
  BaseLoadingState.initialize('Success', 'success'),
  BaseLoadingState.initialize('Failed', 'failed')
])
