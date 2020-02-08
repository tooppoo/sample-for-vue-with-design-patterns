import { State, StateList } from '../model/state'
import { AppState } from '../model/index'
import { Loading, Success, Failed } from './state'
import { NoAction, Alert, Reload, Disable } from './button-behavior'

export class Interactor {
  initialize (): AppState {
    const states = StateList.create([
      Loading(Disable(NoAction('Now Loading...'))).activate(),
      Success(Alert('Success!!')('Click Me!!')),
      Failed(Reload('Please Retry'))
    ])

    return { states }
  }
  selectStatus (selected: State, { states }: AppState): AppState {
    return {
      states: states.activate(selected)
    }
  }

  currentState ({ states }: AppState): State {
    const activated = states.find(s => s.isActivated)

    if (activated === null) {
      throw new Error('not found activated state')
    }

    return activated
  }
}
