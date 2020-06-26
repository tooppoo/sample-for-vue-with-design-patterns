
export class NormalState {
  static create () {
    return new NormalState()
  }

  get style () {
    return {
      'border-color': 'green'
    }
  }

  get notification () {
    return '[class]'
  }
}
export class CloseToLimitState {
  static create () {
    return new CloseToLimitState()
  }

  get style () {
    return {
      'border-color': 'yellow',
      'background-color': 'yellow'
    }
  }

  get notification () {
    return '※期限が迫っています[class]'
  }
}
export class LimitOverState {
  static create () {
    return new LimitOverState()
  }

  get style () {
    return {
      'border-color': 'red',
      'background-color': 'red',
      color: 'white',
      'font-weight': 'bold'
    }
  }

  get notification () {
    return '※期限が過ぎています[class]'
  }
}
