import express, { NextFunction, Request, Response } from "express";
const router = express.Router();
import { ClientType, OfferType } from "../types";
import { getAllClients, getClientById, updateClientProfile } from "../controllers/clientController";

router.get("/", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const clients: Array<ClientType> = await getAllClients();
    res.json(clients);
  } catch (error) {
    next(error);
  };
});

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const client: ClientType = await getClientById(id);
      return res.json(client);
    } catch (error) {
      next(error);
    };
  }
);

router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  const id: string = req.params.id;
  const { name, lastName, born_date, photo, favorites }: { name: string, lastName: string, born_date: string, photo: string, favorites: OfferType[] } = req.body;
  try {
    const clientUpdate: ClientType = await updateClientProfile(id, name, lastName, born_date, photo, favorites);
    res.json(clientUpdate);
  } catch (error) {
    next(error);
  };
});

export default router;
