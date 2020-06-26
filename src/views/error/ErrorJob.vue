<template>
  <div class="error-job">
    <h1>Error Job</h1>
    <ul class="error-job__select">
      <li
        v-for="v in ['conflict', 'forbidden', 'not-enough', 'not-found', 'timeout']"
        :key="v"
      >
        エラー:{{ v }}
        <input
          type="checkbox"
          :value="v"
          @input="onChange"
        >
      </li>
    </ul>
    <button
      @click="run"
    >
      処理開始
    </button>
    <button
      @click="reset"
    >
      リセット
    </button>
    <ul>
      <li
        v-for="(error, i) in notification.errors"
        :key="i"
      >
        {{ error.message }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import {
  Notification,
  jobConflictedError,
  jobForbiddenError,
  jobNotEnoughParameterError,
  jobNotFoundError,
  jobTimeoutError
} from './notification'

interface Event {
  target: {
    value: string
  }
}

@Component
export default class ErrorJob extends Vue {
  enabled: string[] = []

  notification: Notification = new Notification()

  onChange (event: Event) {
    const value = event.target.value
    const enabled = this.enabled.includes(value)

    enabled ? this.disable(value) : this.enable(value)
  }

  run () {
    const notification = new Notification()

    if (this.handleError('conflict')) {
      notification.addError(jobConflictedError)
    }
    if (this.handleError('forbidden')) {
      notification.addError(jobForbiddenError)
    }
    if (this.handleError('not-enough')) {
      notification.addError(jobNotEnoughParameterError)
    }
    if (this.handleError('not-found')) {
      notification.addError(jobNotFoundError)
    }
    if (this.handleError('timeout')) {
      notification.addError(jobTimeoutError)
    }

    this.notification = notification
  }

  reset () {
    this.notification = new Notification()
  }

  private handleError (idx: string): boolean {
    return this.enabled.includes(idx)
  }

  private disable (targetIdx: string) {
    this.enabled = this.enabled.filter(v => v !== targetIdx)
  }

  private enable (targetIdx: string) {
    this.enabled = [
      ...this.enabled,
      targetIdx
    ]
  }
}
</script>
