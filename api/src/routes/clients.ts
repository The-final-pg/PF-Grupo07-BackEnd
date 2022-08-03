import express from "express";
const router = express.Router();
import types from "../types"
import {getAllClients, postNewUser, getClientById} from "../controllers/clientController"

router.get("/", async (_req:any,res:any,next:any) =>{
    try {
        const clients:Array<types.client> = await getAllClients();
        res.json(clients);
    } catch (error) {
        next(error);
    }
})

router.post("/", async (req:any,res:any,next:any) => {
    const newClient = req.body;
    try {
        let response:String;
        response = await postNewUser(newClient);
        res.send(response)
    } catch (error) {
        next(error)
    }
})

router.get("/:idClient", async (req:any, res:any, next:any) =>{
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
