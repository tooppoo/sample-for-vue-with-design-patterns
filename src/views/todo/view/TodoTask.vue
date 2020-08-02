<template>
  <li
    class="todo-task"
    :style="taskState.style"
  >
    <div>
      {{ content }}&nbsp;{{ taskState.notification }}
    </div>
    <div class="todo-task__limit">
      <div>
        <label>
          期限:&nbsp;
          <input
            type="date"
            :value="limit"
            @change="onChangeLimit(todo, $event.target.value)"
          >
        </label>
      </div>
    </div>
  </li>
</template>

<script lang="ts">
import { selectTaskState } from '@/views/todo/model/select-task-state'
import { Todo } from '@/views/todo/model/todo'
import Vue from 'vue'
import { Component, Emit, Prop } from 'vue-property-decorator'
import TaskState from '../model/task-state'
// import { NormalState, CloseToLimitState, LimitOverState } from './task-state-class.js'
// import { NormalState, CloseToLimitState, LimitOverState } from './task-state-legacy.js'
// import { NormalState, CloseToLimitState, LimitOverState } from './task-state-plane.js'

@Component
export default class TodoTask extends Vue {
  @Prop({ required: true })
  todo!: Todo

  @Prop({ default: () => new Date() })
  baseDate!: Date

  get content (): string {
    return this.todo.content
  }

  get limit (): string {
    return this.todo.limit
  }

  get taskState (): TaskState {
    return selectTaskState(this.todo, this.baseDate)
  }

  @Emit('change-limit')
  onChangeLimit (_todo: Todo, _newLimit: string) { }
}
</script>

<style scoped>
.todo-task {
  align-items: center;
  border-width: 1px;
  border-style: solid;
  display: flex;
  height: 100px;
  justify-content: space-between;
  margin: 10px auto;
  padding-left: 10px;
  padding-right: 10px;
  width: 500px;
}
.todo-task__limit {
  display: flex;
}
</style>
