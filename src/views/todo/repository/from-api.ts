import { TodoRepository } from '../repository'
import { Todo } from '@/views/todo/todo'

interface TodoResponse {
  id: number
  content: string
  limit_at: string
  completed: boolean
}

export class FromApiTodoRepository implements TodoRepository {
  async list (): Promise<Todo[]> {
    const response = await fetch('http://localhost:8090/todos')
    const responseTodo: TodoResponse[] = await response.json()

    return responseTodo.map(todo => ({
      content: todo.content,
      limit: todo.limit_at,
      completed: todo.completed
    }))
  }
}
