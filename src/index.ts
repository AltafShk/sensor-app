import express, { Request, Response } from "express";
import "express-async-errors";
import { Database } from "./utils/db";
import { Middlewares } from "./middlewares";
import { SensorRouter } from "./routes/sensor.router";
import { redisClient } from "./utils/redis";

const app = express();

app.use(Middlewares.Json());
app.use(Middlewares.UrlEncoded());

app.get("/", (req, res) => {
  res.status(200).send("OK");
});

app.use("/sensor", SensorRouter);

app.get("/sensor-data", async (req: Request, res: Response) => {
  const db = Database.getInstance();
  const data = await db.query(`SELECT * FROM SensorData`);
  return res.status(200).send(data);
});

app.get("/clear", async (req: Request, res: Response) => {
  await redisClient.flushAll();
  const db = Database.getInstance();
  await db.query(`DELETE FROM SensorData`);
  return res.status(200).send("Cache and Database Cleared");
});

app.use(Middlewares.ErrorHandler());

app.listen(3000, async () => {
  const db = new Database();
  await redisClient.connect();
  console.log("App listening on port 3000!");
});
