import { BaseError, Severity } from "../errors";
import type { NextFunction, Request, Response } from "express";

export const ErrorHandler =
  () => (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof BaseError) {
      return res.status(err.statusCode).send({ errors: err.serializeErrors() });
    }

    // Internal Server Error
    console.log(err);
    return res.status(500).send({
      errors: [{ message: "Something went wrong" }],
    });
  };
