import { BaseError, Severity } from './base.error';

export class BadRequestError extends BaseError {
  statusCode = 400;
  severity = Severity.NORMAL;

  constructor() {
    super('Bad Request');

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors(): { message: string; field?: string }[] {
    return [{ message: 'Bad Request' }];
  }
}
