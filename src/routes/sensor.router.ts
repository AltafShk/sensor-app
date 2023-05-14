import { Router } from "express";
import { SensorController } from "../controller/sensor.controller";
import { Middlewares } from "../middlewares";

const SensorRouter = Router();

SensorRouter.use(Middlewares.CheckAndCacheID());
SensorRouter.post("/", SensorController.handleSignal);
SensorRouter.use(Middlewares.UnCacheID());

export { SensorRouter };
