import express from "express";
const router = express.Router();
import types from "../types";

const bcrypt = require("bcrypt")
import { getWorkerById, createWorker } from "../controllers/workerController";


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

  const worker = req.body;
    try {
      const hashedPassword = await bcrypt.hash(worker.password, 8);
      let response : String;
      response = await createWorker(worker, hashedPassword)
      res.send(response)
    } catch (error) {
      next(error)
    }
}); 


export default router;
