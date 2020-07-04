import { TodoRepository } from '../repository'
import { Todo } from '@/views/todo/todo'

interface TodoResponse {
  id: number
  content: string
  limit_at: string
  completed: boolean
}

export class FromApiTodoRepository implements TodoRepository {
  constructor (
    private readonly baseUrl: string = 'http://localhost:8090/todos'
  ) {}

  async list (): Promise<Todo[]> {
    const response = await fetch(this.baseUrl)
    const responseTodo: TodoResponse[] = await response.json()

    return responseTodo.map(todo => ({
      id: todo.id,
      content: todo.content,
      limit: todo.limit_at,
      completed: todo.completed
    }))
  }

  async save (todo: Todo): Promise<void> {
    await fetch(`${this.baseUrl}/${todo.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: todo.id,
        content: todo.content,
        limit_at: todo.limit,
        completed: todo.completed
      })
    })
  }
}
