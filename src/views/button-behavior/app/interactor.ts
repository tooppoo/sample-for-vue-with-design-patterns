import { Loading, Success, Failed, LoadingState, LoadingStateList } from '../model/state'
import { AppState } from '../model/index'
import { NoAction, Alert, Reload, Disable } from '../model/button-behavior'

export class Interactor {
  initialize (): AppState {
    const states = LoadingStateList.create([
      Loading(Disable(NoAction('Now Loading...'))).activate(),
      Success(Alert('Success!!')('Click Me!!')),
      Failed(Reload('Please Retry'))
    ])

    return { states }
  }

  selectStatus (selected: LoadingState, { states }: AppState): AppState {
    return {
      states: states.activate(selected)
    }
  }

  currentState ({ states }: AppState): LoadingState {
    const activated = states.find(s => s.isActivated)

    if (activated === null) {
      throw new Error('not found activated state')
    }

    return activated
  }
}
