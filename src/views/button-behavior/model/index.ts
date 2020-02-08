import { ButtonBehavior, OnLoading, OnSuccess, OnFailed } from './button-behavior'
import { LoadingStateList, State } from './state'

export interface AppState {
  loadingState: State
  behavior: ButtonBehavior
}

export class Interactor {
  initialize (): AppState {
    const selector = LoadingStateList.head

    return {
      loadingState: selector,
      behavior: this.selectBehavior(selector)
    }
  }
  selectStatus (loadingState: State, state: AppState): AppState {
    return {
      loadingState,
      behavior: this.selectBehavior(loadingState)
    }
  }

  private selectBehavior (loadingState: State): ButtonBehavior {
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
