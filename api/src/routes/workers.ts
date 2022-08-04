import express, { NextFunction, Request, Response } from "express";
const router = express.Router();
import types from "../types";
import { getWorkerById} from "../controllers/workerController";


router.get("/:idWorker", async (req:Request, res:Response, next:NextFunction) =>{
  const {idWorker} = req.params;
    try {
      if(idWorker){
        const workerById: types.worker = await getWorkerById(idWorker)
        return res.json(workerById)
      } else {
        throw new Error("worker id not found")
      }      
    } catch (error) {
      next(error);
    }
});


export default router;
