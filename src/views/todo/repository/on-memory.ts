import { TodoRepository } from '../repository'
import { Todo } from '@/views/todo/todo'

export class OnMemoryTodoRepository implements TodoRepository {
  async list (): Promise<Todo[]> {
    return [
      {
        content: 'まだ当分先のタスク',
        limit: '2019-11-20',
        completed: false
      },
      {
        content: '期限間近のタスク',
        limit: '2019-10-18',
        completed: false
      },
      {
        content: '期限切れのタスク',
        limit: '2019-10-16',
        completed: false
      }
    ]
  }
}
