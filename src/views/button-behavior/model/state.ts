type LoadingStateValue = 'loading' | 'success' | 'failed'
export interface State {
  readonly label: string
  readonly value: LoadingStateValue
  readonly isActivated: boolean

  activate(): State
  inactivate(): State
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
}

export const LoadingStateList: State[] = [
  BaseLoadingState.initialize('Loading', 'loading').activate(),
  BaseLoadingState.initialize('Success', 'success'),
  BaseLoadingState.initialize('Failed', 'failed')
]
