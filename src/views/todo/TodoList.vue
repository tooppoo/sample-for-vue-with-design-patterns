<template>
  <div class="todo">
    <h1>To-Do List</h1>
    <ul class="todo-list">
      <todo-task
        v-for="(task, i) in tasks"
        :key="i"
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
import { Component } from 'vue-property-decorator'
import TodoTask from './TodoTask.vue'

interface Todo {
  content: string
  limit: string
  completed: boolean
}

@Component({
  components: {
    TodoTask
  }
})
export default class StatePattern extends Vue {
  tasks: Todo[] = [
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
