import type { NextFunction, Request, Response } from "express";
import { redisClient } from "../utils/redis";
import { AlreadyProcessingError } from "../errors";

export const CheckAndCacheID =
  () => async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.body;

    const cacheKey = `${id}`;
    const isCached = await redisClient.get(cacheKey);

    // If id is already cached, then reject request
    if (isCached) {
      console.log(`Request from sensor ${id} already cached`);
      throw new AlreadyProcessingError(id);
    }

    // If id is not cached, then cache id and process request
    await redisClient.set(cacheKey, "true"); // Cache id for 60 seconds
    console.log(`Received signal from sensor ${id}`);

    next();
  };
