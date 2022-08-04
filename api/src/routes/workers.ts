import express from "express";
const router = express.Router();
import types from "../types";
import { getWorkerById, postNewWorker } from "../controllers/workerController";

router.get("/:idWorker", async (req:any, res:any, next:any) =>{
  const idWorker = req.params.idWorker;
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

router.post("/", async (req:any, res:any, next:any) =>{
  const newWorker = req.body;
  try {
    let response:String;
        response = await postNewWorker(newWorker);
        res.send(response)
  } catch (error) {
    next(error);
  }
});

export default router;
