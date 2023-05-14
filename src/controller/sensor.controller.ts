import type { RequestHandler } from "express";
import { SensorPayload } from "../typings/sensor.payload";
import { redisClient } from "../utils/redis";
import { Database } from "../utils/db";

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
    await db.query(
      `INSERT INTO SensorData (id, data) VALUES (${id} ,'${stringifiedData}')`
    );

    console.log(`Stored signal from sensor ${id}`);
    next();
  };
}
