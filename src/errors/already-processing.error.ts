import { BaseError, Severity } from "./base.error";

export class AlreadyProcessingError extends BaseError {
  statusCode = 409;
  severity = Severity.CRITICAL;

  constructor(id: string) {
    super("Already Processing request from ID: " + id);

    Object.setPrototypeOf(this, AlreadyProcessingError.prototype);
  }

  serializeErrors(): { message: string; field?: string }[] {
    return [
      {
        message:
          "Conflicting Request - A request with same ID is already being processed.",
      },
    ];
  }
}
