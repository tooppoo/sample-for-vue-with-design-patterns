import { ButtonBehavior, OnLoading, OnSuccess, OnFailed } from './button-behavior'
import { LoadingStateList, LoadingState } from './state'

export interface AppState {
  loadingState: LoadingState
  behavior: ButtonBehavior
}

export class Interactor {
  initialize (): AppState {
    const selector = LoadingStateList[0]

    return {
      loadingState: selector,
      behavior: this.selectBehavior(selector)
    }
  }
  selectStatus (loadingState: LoadingState, state: AppState): AppState {
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
