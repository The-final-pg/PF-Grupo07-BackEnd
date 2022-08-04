import express, { NextFunction, Request, Response, Router } from "express";
const router = express.Router();
import {WorkerType} from "../types";
import { getWorkerById} from "../controllers/workerController";

router.get("/worker", async (req, res, next) => {

})


router.get("/:idWorker", async (req:Request, res:Response, next:NextFunction) =>{
  const {idWorker} = req.params;
    try {
      if(idWorker){
        const workerById: WorkerType = await getWorkerById(idWorker)
        return res.json(workerById)
      } else {
        throw new Error("worker id not found")
      }      
    } catch (error) {
      next(error);
    }
});


export default router;
