import { BaseError, Severity } from './base.error';

export class BadRequestError extends BaseError {
  statusCode = 400;
  severity = Severity.NORMAL;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors(): { message: string; field?: string }[] {
    return [{ message: this.message }];
  }
}
