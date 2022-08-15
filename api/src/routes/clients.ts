import express, { NextFunction, Request, Response } from "express";
const router = express.Router();
<<<<<<< HEAD
import { ClientType } from "../types";
import { getAllClients, getClientById } from "../controllers/clientController";
=======
import { ClientType, OfferType } from "../types";
import { getAllClients, getClientById, updateClientProfile } from "../controllers/clientController";
>>>>>>> bb6b88afcb0a9b38ecb012339db351455856ac50

router.get("/", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const clients: Array<ClientType> = await getAllClients();
    res.json(clients);
  } catch (error) {
    next(error);
<<<<<<< HEAD
  }
});

router.get(
  "/:idClient",
  async (req: Request, res: Response, next: NextFunction) => {
    const { idClient } = req.params;
    try {
      const client: ClientType = await getClientById(idClient);
      return res.json(client);
    } catch (error) {
      next(error);
    }
  }
);
=======
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
  const { name, born_date, photo, favorites }: { name: string; born_date: string, photo: string, favorites: OfferType[] } = req.body;
  try {
    const clientUpdate: ClientType = await updateClientProfile(id, name, born_date, photo, favorites);
    res.json(clientUpdate);
  } catch (error) {
    next(error);
  };
});

>>>>>>> bb6b88afcb0a9b38ecb012339db351455856ac50
export default router;
