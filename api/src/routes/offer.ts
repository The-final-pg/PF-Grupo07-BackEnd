import express, { NextFunction, Request, Response } from "express";
import { OfferType } from "../types";
import {
  getAllOffers,
  postOffer,
  getOfferById,
  getOffersBySearch,
  putOfferState,
} from "../controllers/offerController";
import {
  offerFilteredByProfession,
  offerAllFiltersOn,
  offerFilteredByRating,
  offerFilteredByRemuneration,
} from "../services/filteredSearchOffer";

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
    const { q, p, r, max, min } = req.query;

    try {
      let offers: OfferType[];
      if (q && !p && !r && !max && !min) {
        offers = await getOffersBySearch(q);
      }
      if (q && p && !r && !max && !min) {
        offers = await offerFilteredByProfession(q, p);
      }
      if (q && !p && r && !max && !min) {
        offers = await offerFilteredByRating(q, r);
      }
      if (q && !p && !r && max && min) {
        offers = await offerFilteredByRemuneration(q, max, min);
      }
      if (q && p && r && max && min) {
        offers = await offerAllFiltersOn(q, p, r, max, min);
      }
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
      const offer: any = await getOfferById(idOffer);
      let result = {
        ...offer,
        offersCount: offer.userClient.offers.length,
        workerName: offer.proposals[0].userWorker.name,
      };
      return res.json(result);
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
});

export default offer;
