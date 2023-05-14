import type { NextFunction, Request, Response } from "express";
import { redisClient } from "../utils/redis";

export const UnCacheID =
  () => async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.body;

    const cacheKey = `${id}`;

    // Remove id from cache
    await redisClient.del(cacheKey);

    return res.status(200).send(`Request from ${id} processed successfully`);
  };
