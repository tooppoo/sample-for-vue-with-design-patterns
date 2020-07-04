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
        @change-limit="onChangeLimit(i, task, $event)"
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

  onChangeLimit (index: number, todo: Todo, newLimit: string) {
    // 配列を直接保持しているがために発生する、破壊的かつ暗黙的な更新.
    // cartでは、first class collectionによって解消.
    this.tasks.splice(index, 1, {
      ...todo,
      limit: newLimit
    })
  }
}
</script>
