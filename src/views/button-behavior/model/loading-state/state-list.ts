import { LoadingState } from '@/views/button-behavior/model/loading-state/loading-state'

export class LoadingStateList {
  static create (states: readonly LoadingState[]): LoadingStateList {
    return new LoadingStateList(states)
  }

  private constructor (private readonly states: readonly LoadingState[]) {
    if (states.every(s => !s.isActivated)) {
      throw new Error('at least one state is activated')
    }
  }

  find (finder: (s: LoadingState) => boolean): LoadingState | null {
    return this.states.find(finder) || null
  }

  activate (target: LoadingState): LoadingStateList {
    return new LoadingStateList(
      this.states.map(
        s => target.equals(s) ? target.activate() : s.inactivate()
      )
    )
  }

  toArray (): readonly LoadingState[] {
    return this.states
  }
}
