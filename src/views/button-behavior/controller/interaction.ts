import { WhenLoading, WhenSuccess, WhenFailed, LoadingState, LoadingStateList } from '../model/state'
import { AppState } from '../model/index'
import { NoAction, Alert, Reload, Disable } from '../model/button-behavior'

export class Interaction {
  initialize (): AppState {
    const states = LoadingStateList.create([
      WhenLoading(Disable(NoAction('Now WhenLoading...'))).activate(),
      WhenSuccess(Alert('WhenSuccess!!')('Click Me!!')),
      WhenFailed(Reload('Please Retry'))
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
