import type { RequestHandler } from "express";
import { SensorPayload } from "../typings/sensor.payload";
import { redisClient } from "../utils/redis";
import { Database } from "../utils/db";
import { BadRequestError, ForbiddenError } from "../errors";

export abstract class SensorController {
  static handleSignal: RequestHandler<
    unknown,
    unknown,
    SensorPayload,
    unknown
  > = async (req, res, next) => {
    const { id } = req.body;

    const stringifiedData = JSON.stringify(req.body);

    // Add data to database
    const db = Database.getInstance();

    try {
      await db.query(
        `INSERT INTO SensorData (id, data) VALUES (${id} ,'${stringifiedData}')`
      );
    } catch (err: any) {
      if (err.errno === 1062) {
        await redisClient.del(`${id}`);
        throw new BadRequestError(
          "There can not be a second request with the same id"
        );
      }
    }

    console.log(`Stored signal with ID: ${id}`);
    next();
  };
}
