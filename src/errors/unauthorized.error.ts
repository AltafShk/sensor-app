import { BaseError, Severity } from './base.error';

export class UnauthorizedError extends BaseError {
  statusCode = 401;
  severity = Severity.NORMAL;

  constructor() {
    super('Unauthorized');

    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }

  serializeErrors(): { message: string; field?: string }[] {
    return [{ message: 'Unauthorized' }];
  }
}
