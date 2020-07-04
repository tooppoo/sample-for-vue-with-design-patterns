
export class Todo {
  static valueOf (input: {
    id: number,
    content: string,
    limit: string,
    completed: boolean
  }): Todo {
    return new Todo(
      input.id, input.content, input.limit, input.completed
    )
  }

  private constructor (
    readonly id: number,
    readonly content: string,
    readonly limit: string,
    readonly completed: boolean
  ) {}
}
