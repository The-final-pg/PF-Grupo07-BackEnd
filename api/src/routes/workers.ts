import express, { NextFunction, Request, Response } from "express";
const worker = express.Router();
import { WorkerType } from "../types";
import {
  getAllWorkers,
  getWorkerById,
  getWorkerByName,
} from "../controllers/workerController";

worker.get("/", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const worker: WorkerType[] = await getAllWorkers();
    res.send(worker);
  } catch (error) {
    next(error);
  }
});

worker.get(
  "/search",
  async (req: Request, res: Response, next: NextFunction) => {
    const q: string = req.query.q as string;
    try {
      const worker: WorkerType[] = await getWorkerByName(q);
      res.send(worker);
    } catch (error) {
      next(error instanceof Error);
    }
  }
);

worker.get(
  "/:idWorker",
  async (req: Request, res: Response, next: NextFunction) => {
    const { idWorker } = req.params;
    try {
        const workerById: WorkerType = await getWorkerById(idWorker);
        return res.json(workerById);
    } catch (error) {
      next(error);
    }
  }
);

export default worker;
