import express, { NextFunction, Request, Response } from "express";
const router = express.Router();
import { ClientType } from "../types";
import { getAllClients, getClientById } from "../controllers/clientController";

router.get("/", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const clients: Array<ClientType> = await getAllClients();
    res.json(clients);
  } catch (error) {
    next(error);
  }
});

router.get(  "/:idClient",  async (req: Request, res: Response, next: NextFunction) => {
    const { idClient } = req.params;
    try {
      const client: ClientType = await getClientById(idClient);
      return res.json(client);
    } catch (error) {
      next(error);
    }
  }
);
export default router;
