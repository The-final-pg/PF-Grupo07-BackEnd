import express, { NextFunction, Request, Response } from "express";
const worker = express.Router();
<<<<<<< HEAD
import { WorkerType } from "../types";
=======
import { WorkerType, OfferType } from "../types";
>>>>>>> bb6b88afcb0a9b38ecb012339db351455856ac50
import {
  getAllWorkers,
  getWorkerById,
  getWorkerByName,
<<<<<<< HEAD
} from "../controllers/workerController";
import { workerAllfiltersOn, workerFilteredByProfession, workerFilteredByRating } from "../services/filteredSearchWorker";

worker.get("/", async (_req: Request, res: Response, next: NextFunction) => {
  /* const multiplier: number = req.body.multiplier; */
  try {
    const worker: WorkerType[] = await getAllWorkers(/* multiplier */);
=======
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
>>>>>>> bb6b88afcb0a9b38ecb012339db351455856ac50
    res.send(worker);
  } catch (error) {
    next(error);
  }
});

worker.get(
  "/search",
  async (req: Request, res: Response, next: NextFunction) => {
<<<<<<< HEAD
    const {q, p, r} = req.query;
/*     const multiplier: number = req.body.multiplier; */
    try {
      let worker: WorkerType[]; 
      if (q && !p && !r){
        worker = await getWorkerByName(q/* , multiplier */);
      }
      else if(q && p && !r){
        worker = await workerFilteredByProfession(q, p/* , multiplier */);
      }
      else if(!q && p && !r){
        worker = await workerFilteredByProfession(q, p/* , multiplier */);
      }
      else if (q && !p && r){
        worker = await workerFilteredByRating(q, r/* , multiplier */);
      }
      else if (!q && !p && r){
        worker = await workerFilteredByRating(q, r/* , multiplier */);
      }
      else {
        worker = await workerAllfiltersOn(q, p, r/* , multiplier */);
=======
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
>>>>>>> bb6b88afcb0a9b38ecb012339db351455856ac50
      }
      res.send(worker);
    } catch (error) {
      next(error instanceof Error);
    }
  }
);

<<<<<<< HEAD
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
=======
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
>>>>>>> bb6b88afcb0a9b38ecb012339db351455856ac50

export default worker;
