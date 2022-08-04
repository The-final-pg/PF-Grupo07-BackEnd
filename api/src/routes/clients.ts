import express, { NextFunction, Request, Response } from "express";
const router = express.Router();
import types from "../types"
import {getAllClients, getClientById} from "../controllers/clientController"

router.get("/", async (_req:Request,res:Response,next:NextFunction) =>{
    try {
        const clients:Array<types.client> = await getAllClients();
        res.json(clients);
    } catch (error) {
        next(error);
    }
})

router.get("/:idClient", async (req:Request, res:Response, next:NextFunction) =>{
    const {idClient} = req.params;
    try {
        if(idClient){
                const client:types.client = await getClientById(idClient);
                return res.json(client);
        }else{
                throw new Error("id was not found")
        }
    } catch (error) {
        next(error)
    }
})
export default router;
