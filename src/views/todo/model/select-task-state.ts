import TaskState, { CloseToLimitState, LimitOverState, NormalState } from '@/views/todo/model/task-state'
import { Todo } from '@/views/todo/model/todo'

export const selectTaskState = (task: Todo, baseDate: Date): TaskState => {
  const limit = new Date(task.limit)

  const diff = limit.getTime() - baseDate.getTime()
  const oneDay = 1000 * 60 * 60 * 24

  if (diff > oneDay * 3) {
    return NormalState.create()
  }
  if (diff >= 0) {
    return CloseToLimitState.create()
  }

  return LimitOverState.create()
}
