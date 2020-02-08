type LoadingStateValue = 'loading' | 'success' | 'failed'
export interface LoadingState {
  readonly label: string
  readonly value: LoadingStateValue
  readonly isActivated: boolean

  activate(): LoadingState
  inactivate(): LoadingState
}

class BaseLoadingState implements LoadingState {
  static initialize (label: string, value: LoadingStateValue): LoadingState {
    return new BaseLoadingState(label, value, false)
  }
  private constructor (
    readonly label: string,
    readonly value: LoadingStateValue,
    readonly isActivated: boolean
  ) { }

  activate (): LoadingState {
    return new BaseLoadingState(this.label, this.value, true)
  }
  inactivate (): LoadingState {
    return new BaseLoadingState(this.label, this.value, false)
  }
}

export const LoadingStateList: LoadingState[] = [
  BaseLoadingState.initialize('Loading', 'loading').activate(),
  BaseLoadingState.initialize('Success', 'success'),
  BaseLoadingState.initialize('Failed', 'failed')
]
