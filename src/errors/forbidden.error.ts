import { BaseError, Severity } from './base.error';

export class ForbiddenError extends BaseError {
  statusCode = 403;
  severity = Severity.CRITICAL;

  constructor() {
    super('Forbidden');

    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }

  serializeErrors(): { message: string; field?: string }[] {
    return [{ message: 'Forbidden' }];
  }
}
