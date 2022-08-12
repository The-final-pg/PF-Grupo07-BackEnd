import express, { NextFunction, Request, Response } from "express";
const worker = express.Router();
import { WorkerType, OfferType } from "../types";
import {
  getAllWorkers,
  getWorkerById,
  getWorkerByName,
  updateWorkerProfile
} from "../controllers/workerController";
import {
  workerAllfiltersOn,
  workerFilteredByProfession,
  workerFilteredByRating
} from "../services/filteredSearchWorker";

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
    const { q, p, r } = req.query;
    try {
      let worker: WorkerType[];
      if (q && !p && !r) {
        worker = await getWorkerByName(q );
      } else if (q && p && !r) {
        worker = await workerFilteredByProfession(q, p );
      } else if (!q && p && !r) {
        worker = await workerFilteredByProfession(q, p );
      } else if (q && !p && r) {
        worker = await workerFilteredByRating(q, r );
      } else if (!q && !p && r) {
        worker = await workerFilteredByRating(q, r );
      } else {
        worker = await workerAllfiltersOn(q, p, r );
      }
      res.send(worker);
    } catch (error) {
      next(error instanceof Error);
    }
  }
);

worker.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const workerById: WorkerType = await getWorkerById(id);
    return res.json(workerById);
  } catch (error) {
    next(error);
  }
});

worker.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  const id: string = req.params.id;
  const {
    name,
    born_date,
    photo,
    profession,
    skills,
    favorites
  }: {
    name: string;
    born_date: Date;
    photo: string;
    profession: string[];
    skills: string[];
    favorites: OfferType[];
  } = req.body;
  try {
    const workerUpdate: WorkerType = await updateWorkerProfile(
      id,
      name,
      born_date,
      photo,
      profession,
      skills,
      favorites
    );
    res.json(workerUpdate);
  } catch (error) {
    next(error);
  }
});

export default worker;
