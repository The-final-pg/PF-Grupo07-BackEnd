import express, { NextFunction, Request, Response } from "express";
const register = express.Router();
const bcrypt = require("bcrypt")
import { createWorker, createClient } from "../controllers/registerController";


register.post("/client", async (req:Request,res:Response,next:NextFunction) => {
    const newClient = req.body;
    try {
        const hashedPassword = await bcrypt.hash(newClient.password, 8) 
        console.log("pw", hashedPassword)
        console.log("client", newClient)
        let response:String;
        response = await createClient(newClient, hashedPassword);
        res.send(response)
    } catch (error) {
        next(error)
    }
})

register.post("/worker", async (req:Request, res:Response, next:NextFunction) =>{

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




export default register;
