import { JobError } from '@/views/error/job-error'

export class Notification {
  private _errors: JobError[] = []

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
