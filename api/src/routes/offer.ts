import express, { NextFunction, Request, Response } from "express";
import { OfferType } from "../types";
import {
  getAllOffers,
  postOffer,
  getOfferById,
  getOffersBySearch,
  putOfferState,
} from "../controllers/offerController";

const offer = express.Router();

offer.get("/", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const offers: Array<OfferType> = await getAllOffers();
    res.json(offers);
  } catch (error) {
    next(error);
  }
});

offer.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const data: OfferType = req.body;
  try {
    let newOffer: String;
    newOffer = await postOffer(data);
    res.send(newOffer);
  } catch (error) {
    next(error);
  }
});

offer.get(
  "/search",
  async (req: Request, res: Response, next: NextFunction) => {
    const q: string = req.query.q as string;
    try {
      const offers: Array<OfferType> = await getOffersBySearch(q);
      res.json(offers);
    } catch (error) {
      next(error);
    }
  }
);

offer.get(
  "/:idOffer",
  async (req: Request, res: Response, next: NextFunction) => {
    const { idOffer } = req.params;
    try {
      if (idOffer) {
        const offer: OfferType = await getOfferById(idOffer);
        return res.json(offer);
      } else {
        throw new Error("id was not found");
      }
    } catch (error) {
      next(error);
    }
  }
);

offer.put("/", async (req: Request, res: Response, next: NextFunction) => {
  const { id, state } = req.body;
  try {
    if (id && state) {
      const offerState: String = await putOfferState(id, state);
      res.send(offerState);
    }
  } catch (error) {
    next(error);
  }
})

export default offer;
