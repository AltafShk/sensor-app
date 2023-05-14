import { BaseError, Severity } from './base.error';

export class NotFoundError extends BaseError {
  statusCode = 404;
  severity = Severity.NORMAL;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors(): { message: string; field?: string }[] {
    return [{ message: this.message }];
  }
}
