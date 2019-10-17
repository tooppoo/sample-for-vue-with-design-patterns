
export const NormalState = (function () {
  const constructor = function NormalStateConstructor () { }

  constructor.prototype.style = {
    'border-color': 'green'
  }
  constructor.prototype.notification = ''

  return constructor
})()
export const CloseToLimitState = (function () {
  const constructor = function CloseToLimitStateConstructor () { }

  constructor.prototype.style = {
    'border-color': 'yellow',
    'background-color': 'yellow'
  }
  constructor.prototype.notification = '※期限が迫っています'

  return constructor
})()
export const LimitOverState = (function () {
  const constructor = function LimitOverStateConstructor () { }

  constructor.prototype.style = {
    'border-color': 'red',
    'background-color': 'red',
    color: 'white',
    'font-weight': 'bold'
  }
  constructor.prototype.notification = '※期限が過ぎています'

  return constructor
})()
