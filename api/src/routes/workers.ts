import express, { NextFunction, Request, Response } from "express";
const worker = express.Router();
import { WorkerType } from "../types";
import {
  getAllWorkers,
  getWorkerById,
  getWorkerByName,
} from "../controllers/workerController";
import { workerAllfiltersOn, workerFilteredByProfession, workerFilteredByRating } from "../services/filteredSearchWorker";

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
    const {q, p, r} = req.query;
    try {
      let worker: WorkerType[]; 
      if (q && !p && !r){
        worker = await getWorkerByName(q);
      }
      if(q && p && !r){
        worker = await workerFilteredByProfession(q, p);
      }
      if (q && !p && r){
        worker = await workerFilteredByRating(q, r);
      }
      if (q && p && r) {
        worker = await workerAllfiltersOn(q, p, r);
      }
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
