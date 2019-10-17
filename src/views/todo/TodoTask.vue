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
        期限:&nbsp;
        <input
          type="date"
          :value="limit"
          @change="onChangeLimit($event.target.value)"
        >
      </div>
    </div>
  </li>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Emit, Prop } from 'vue-property-decorator'
import TaskState, { NormalState, CloseToLimitState, LimitOverState } from './task-state'
// import TaskState from './task-state'
// import { NormalState, CloseToLimitState, LimitOverState } from './task-state-class.js'

@Component
export default class TodoTask extends Vue {
  @Prop({ required: true })
  content!: string

  @Prop({ required: true })
  limit!: string

  @Prop({ default: () => new Date() })
  baseDate!: Date

  get taskState (): TaskState {
    const limit = new Date(this.limit)

    const diff = limit.getTime() - this.baseDate.getTime()
    const oneDay = 1000 * 60 * 60 * 24

    if (diff > oneDay * 3) {
      return new NormalState()
    }
    if (diff >= 0) {
      return new CloseToLimitState()
    }

    return new LimitOverState()
  }

  @Emit('change-limit')
  onChangeLimit (value: string) { }
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
