
export const NormalState = {
  create () {
    return {
      style: {
        'border-color': 'green'
      },
      notification: ''
    }
  }
}
export const CloseToLimitState = {
  create () {
    return {
      style: {
        'border-color': 'yellow',
        'background-color': 'yellow'
      },
      notification: '※期限が迫っています'
    }
  }
}
export const LimitOverState = {
  create () {
    return {
      style: {
        'border-color': 'red',
        'background-color': 'red',
        color: 'white',
        'font-weight': 'bold'
      },
      notification: '※期限が過ぎています'
    }
  }
}
