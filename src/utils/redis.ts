import { createClient } from "redis";
import env from "../config/env";

export const redisClient = createClient({
  url: env.REDIS_ENDPOINT,
});

redisClient.on("connect", () => {
  console.log("Redis connected");
});
