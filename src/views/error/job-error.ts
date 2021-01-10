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

export const jobNotEnoughParameterError = new JobError('処理に必要な情報が不足しています')
export const jobForbiddenError = new JobError('処理は許可されていません')
export const jobConflictedError = new JobError('処理がコンフリクトしました')
export const jobNotFoundError = new JobError('指定された処理が見つかりませんでした')
export const jobTimeoutError = new JobError('処理がタイムアウトしました')
