
export interface ButtonBehavior {
  readonly label: string
  readonly isDisable: boolean
  onClick (): void
}

const buildAction = (action: () => void) => (label: string): ButtonBehavior => ({
  label,
  onClick: action,
  isDisable: false
})

export const Disable = (behavior: ButtonBehavior): ButtonBehavior => ({
  ...behavior,
  isDisable: true
})

export const NoAction = buildAction(() => {})
export const Alert = (message: string) => buildAction(() => alert(message))
export const Reload = buildAction(() => location.reload())
