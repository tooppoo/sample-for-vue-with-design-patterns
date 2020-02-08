import { ButtonBehavior, OnLoading, OnSuccess, OnFailed } from '../model/button-behavior'
import { LoadingStateList, State } from '../model/state'
import { AppState } from '../model/index'

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
