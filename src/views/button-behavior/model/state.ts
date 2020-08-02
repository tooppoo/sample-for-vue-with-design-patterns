import { buildState, StateFactory } from '@/views/button-behavior/model/state-factory'
import { ButtonBehavior } from './button-behavior'

export type StateValue = 'loading' | 'success' | 'failed'
export interface LoadingState {
  readonly label: string
  readonly value: StateValue
  readonly isActivated: boolean
  readonly buttonBehavior: ButtonBehavior

  activate(): LoadingState
  inactivate(): LoadingState

  equals(other: LoadingState): boolean
}

export const WhenLoading: StateFactory = buildState('WhenLoading', 'loading')
export const WhenSuccess: StateFactory = buildState('WhenSuccess', 'success')
export const WhenFailed: StateFactory = buildState('WhenFailed', 'failed')
