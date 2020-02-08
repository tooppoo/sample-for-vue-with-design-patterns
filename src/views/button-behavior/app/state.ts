import { State, BaseState, StateValue } from '../model/state'
import { ButtonBehavior } from '../model/button-behavior'

type StateFactory = (bb: ButtonBehavior) => State
const buildState = (label: string, value: StateValue) => (buttonBehavior: ButtonBehavior) => BaseState.initialize(label, value, buttonBehavior)

export const Loading: StateFactory = buildState('Loading', 'loading')
export const Success: StateFactory = buildState('Success', 'success')
export const Failed: StateFactory = buildState('Failed', 'failed')
