import { ButtonBehavior } from './button-behavior'
import { State } from './state'

export interface AppState {
  loadingState: State
  behavior: ButtonBehavior
}
