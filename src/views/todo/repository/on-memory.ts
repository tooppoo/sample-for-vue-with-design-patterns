import { TodoRepository } from '../repository'
import { Todo } from '@/views/todo/todo'

export class OnMemoryTodoRepository implements TodoRepository {
  private _list: Todo[] = [
    {
      id: 1,
      content: 'まだ当分先のタスク',
      limit: '2019-11-20',
      completed: false
    },
    {
      id: 2,
      content: '期限間近のタスク',
      limit: '2019-10-18',
      completed: false
    },
    {
      id: 3,
      content: '期限切れのタスク',
      limit: '2019-10-16',
      completed: false
    }
  ]

  async list (): Promise<Todo[]> {
    return this._list
  }

  }
}
