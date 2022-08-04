import express, { NextFunction, Request, Response } from "express";
const router = express.Router();
import { WorkerType } from "../types";
import { getAllWorkers, getWorkerById } from "../controllers/workerController";

router.get(
  "/",
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const worker: WorkerType[] = await getAllWorkers();
      res.send(worker);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:idWorker",
  async (req: Request, res: Response, next: NextFunction) => {
    const { idWorker } = req.params;
    try {
      if (idWorker) {
        const workerById: WorkerType = await getWorkerById(idWorker);
        return res.json(workerById);
      } else {
        throw new Error("worker id not found");
      }
    } catch (error) {
      next(error);
    }
  }
);

export default router;
