
export default interface TaskState {
  readonly style: object
  readonly notification: string
}

export class NormalState implements TaskState {
  static create (): TaskState {
    return new NormalState()
  }

  get style (): object {
    return {
      'border-color': 'green'
    }
  }

  get notification (): string {
    return ''
  }
}
export class CloseToLimitState implements TaskState {
  static create (): TaskState {
    return new CloseToLimitState()
  }

  get style (): object {
    return {
      'border-color': 'yellow',
      'background-color': 'yellow'
    }
  }

  get notification (): string {
    return '※期限が迫っています'
  }
}
export class LimitOverState implements TaskState {
  static create (): TaskState {
    return new LimitOverState()
  }

  get style (): object {
    return {
      'border-color': 'red',
      'background-color': 'red',
      color: 'white',
      'font-weight': 'bold'
    }
  }

  get notification (): string {
    return '※期限が過ぎています'
  }
}
