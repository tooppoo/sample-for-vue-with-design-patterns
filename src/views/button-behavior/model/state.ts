type LoadingStateValue = 'loading' | 'success' | 'failed'
export interface LoadingState {
  label: string
  value: LoadingStateValue
}

export const LoadingStateList: LoadingState[] = [
  {
    label: 'Loading',
    value: 'loading'
  },
  {
    label: 'Success',
    value: 'success'
  },
  {
    label: 'Failed',
    value: 'failed'
  }
]
