import express, { NextFunction, Request, Response } from "express";
const worker = express.Router();
import { WorkerType, OfferType } from "../types";
import {
  getAllWorkers,
  getWorkerById,
  getWorkerByName,
  updateWorkerProfile,
  putWorkerPremium,
  addBankDataWorker
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
        worker = await getWorkerByName(q as string);
      } else if (q && p && !r) {
        worker = await workerFilteredByProfession(q as string, p as string);
      } else if (!q && p && !r) {
        worker = await workerFilteredByProfession(q as string, p as string);
      } else if (q && !p && r) {
        worker = await workerFilteredByRating(q as string, r as string);
      } else if (!q && !p && r) {
        worker = await workerFilteredByRating(q as string, r as string);
      } else {
        worker = await workerAllfiltersOn(q as string, p as string, r as string);
      }
      res.send(worker);
    } catch (error) {
      next(error instanceof Error);
    }
  }
);

worker.put("/premium", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id: string = req.body.id;
    const premium: boolean = req.body.premium;
    if (premium) {
      const response: string = await putWorkerPremium(id, premium);
      return res.send(response);
    } else {
      res.send("El estado premium es false");
    };
  } catch (error) {
    next(error);
  }
})

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
    lastName,
    born_date,
    photo,
    profession,
    skills,
    favorites,
    description,
  }: {
    name: string;
    lastName: string;
    born_date: Date;
    photo: string;
    profession: string[];
    skills: string[];
    favorites: OfferType[];
    description: string;
  } = req.body;
  try {
    const workerUpdate: WorkerType = await updateWorkerProfile(
      id,
      name,
      lastName,
      born_date,
      photo,
      profession,
      skills,
      favorites,
      description,
    );
    res.json(workerUpdate);
  } catch (error) {
    next(error);
  }
});

worker.put("/bank", async (req: Request, res: Response, next: NextFunction) => {
  const { id, bank_data}:{id:string, bank_data:JSON} = req.body;
  try {
    const updateWorkerDataBank:any = await addBankDataWorker(id, bank_data);
    return res.json(updateWorkerDataBank);
  } catch (error) {
    next(error);
  }
})

export default worker;
