import { ButtonBehavior, OnLoading, OnSuccess, OnFailed } from './button-behavior'

type LoadingStateValue = 'loading' | 'success' | 'failed'
export interface LoadingState {
  label: string
  value: LoadingStateValue
}

export interface State {
  loadingState: LoadingState
  behavior: ButtonBehavior
}

export const LoadingStateList: LoadingState[] = [
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

export class Interactor {
  initialize (): State {
    const selector = LoadingStateList[0]

    return {
      loadingState: selector,
      behavior: this.selectBehavior(selector)
    }
  }
  selectStatus (loadingState: LoadingState, state: State): State {
    return {
      loadingState,
      behavior: this.selectBehavior(loadingState)
    }
  }

  private selectBehavior (loadingState: LoadingState): ButtonBehavior {
    switch (loadingState.value) {
      case 'loading':
        return new OnLoading()
      case 'success':
        return new OnSuccess()
      case 'failed':
        return new OnFailed()
    }
  }
}
