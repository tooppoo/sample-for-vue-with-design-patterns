import { Todo } from './todo'

export interface TodoRepository {
  list (): Promise<Todo[]>

  save (todo: Todo): Promise<void>
}
