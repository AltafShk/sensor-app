export abstract class BaseError extends Error {
  abstract statusCode: number;
  abstract severity: Severity;

  protected constructor(message?: string) {
    super(message);

    Object.setPrototypeOf(this, BaseError.prototype);
  }

  abstract serializeErrors(): { message: string; field?: string }[];
}

export enum Severity {
  NORMAL = 'normal',
  CRITICAL = 'critical',
}
