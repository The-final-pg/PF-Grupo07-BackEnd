import express, { Request, Response, NextFunction } from "express";
const verifyUser = express.Router();
import { ClientType, WorkerType } from "../types";
import { updateClientStatus, updateWorkerStatus } from "../controllers/verifyUserController"

verifyUser.put("/client/:id", async (req: Request, res: Response, next: NextFunction) => {
    const id: string = req.params.id;
    try {
        const clientVerified: ClientType = await updateClientStatus(id)
        console.log("clientVerified", clientVerified)
        res.json(clientVerified)
    } catch (error) {
        next(error)
    }
})

verifyUser.put("/worker/:id", async (req: Request, res: Response, next: NextFunction) => {
    const id: string = req.params.id;
    try {
        const workerVerified: WorkerType = await updateWorkerStatus(id)
        res.json(workerVerified)
    } catch (error) {
        next(error)
    }
})

export default verifyUser