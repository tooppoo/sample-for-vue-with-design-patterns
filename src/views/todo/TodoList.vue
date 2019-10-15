<template>
  <div class="todo">
    <h1>To-Do List</h1>
    <ul class="todo-list">
      <todo-task
        content="まだ当分先のタスク"
        limit="2019-11-20"
        :completed="false"
      />
      <todo-task
        content="期限間近のタスク"
        limit="2019-10-18"
        :completed="false"
      />
      <todo-task
        content="期限切れのタスク"
        limit="2019-10-15"
        :completed="false"
      />
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import TodoTask from './TodoTask.vue'

@Component({
  components: {
    TodoTask
  }
})
export default class StatePattern extends Vue {}
</script>
