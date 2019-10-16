
export class Notification {
  private _errors: JobError[] = []

  get hasErrors (): boolean {
    return this._errors.length > 0
  }

  get errors (): JobError[] {
    return this._errors
  }

  hasError (error: JobError): boolean {
    return this._errors.find(e => e.equals(error)) !== null
  }

  addError (error: JobError): void {
    this._errors = [
      ...this._errors,
      error
    ]
  }
}

export class JobError {
  constructor (private readonly _message: string) {
    //
  }

  get message (): string {
    return this._message
  }

  equals (other: JobError): boolean {
    return this.message === other.message
  }
}

export const jobForbiddenError = new JobError('処理は許可されていません')
export const jobConflictedError = new JobError('処理がコンフリクトしました')
export const jobNotEnoughParameterError = new JobError('処理に必要な情報が不足しています')
export const jobNotFoundError = new JobError('指定された処理が見つかりませんでした')
export const jobTimeoutError = new JobError('処理がタイムアウトしました')
