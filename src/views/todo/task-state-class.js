
export class NormalState {
  get style () {
    return {
      'border-color': 'green'
    }
  }
  get notification () {
    return ''
  }
}
export class CloseToLimitState {
  get style () {
    return {
      'border-color': 'yellow',
      'background-color': 'yellow'
    }
  }
  get notification () {
    return '※期限が迫っています'
  }
}
export class LimitOverState {
  get style () {
    return {
      'border-color': 'red',
      'background-color': 'red',
      color: 'white',
      'font-weight': 'bold'
    }
  }
  get notification () {
    return '※期限が過ぎています'
  }
}
