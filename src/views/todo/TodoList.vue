<template>
  <div class="todo">
    <h1>To-Do List</h1>
    <ul class="todo-list">
      <todo-task
        v-for="task in tasks"
        :key="task.id"
        :content="task.content"
        :limit="task.limit"
        :completed="false"
        @change-limit="onChangeLimit(task, $event)"
      />
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'
import TodoTask from './TodoTask.vue'
import { Todo } from './todo'
import { TodoRepository } from './repository'

@Component({
  components: {
    TodoTask
  }
})
export default class StatePattern extends Vue {
  @Prop({ required: true })
  repository!: TodoRepository

  tasks: Todo[] = []

  created () {
    this.initialize()
  }

  @Watch('$route')
  async initialize () {
    this.tasks = await this.repository.list()
  }

  onChangeLimit (todo: Todo, newLimit: string) {
    const updated = todo.changeLimit(newLimit)

    this.repository.save(updated).then(() => {
      this.tasks = this.tasks.map(task => task.id === updated.id ? updated : task)
    }).catch((error) => {
      console.error({ error })

      alert(error.toString())
    })
  }
}
</script>
