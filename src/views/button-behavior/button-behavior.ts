
export interface ButtonBehavior {
  readonly label: string
  onClick (): void
}

export class OnLoading implements ButtonBehavior {
  readonly label = 'Now Loading...'

  onClick () {
    // ignore
  }
}
export class OnSuccess implements ButtonBehavior {
  readonly label = 'show alert'

  onClick () {
    alert('Success!!')
  }
}
export class OnFailed implements ButtonBehavior {
  readonly label = 'Retry'

  onClick () {
    location.reload()
  }
}
