import express, { NextFunction, Request, Response } from "express";
import { OfferType } from "../types";
import {
  getAllOffers,
  postOffer,
  getOfferById,
  getOffersBySearch,
  putOfferState,
  putOfferIsActive,
} from "../controllers/offerController";
import {
  offerFilteredByProfession,
  offerAllFiltersOn,
  offerFilteredByRating,
  offerFilteredByRemuneration,
  offerFilteredByWorDurationTime
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

offer.get(
  "/search",
  async (req: Request, res: Response, next: NextFunction) => {
    const { q, p, r, max, min, wdt } = req.query;
    try {
      let offers: OfferType[];
      if (q && !p && !r && !max && !min && !wdt) {
        offers = await getOffersBySearch(q as string);
      } else if (q && p && !r && !max && !min && !wdt) {
        offers = await offerFilteredByProfession(q as string, p as string);
      } else if (!q && p && !r && !max && !min && !wdt) {
        offers = await offerFilteredByProfession(q as string, p as string);
      } else if (q && !p && r && !max && !min && !wdt) {
        offers = await offerFilteredByRating(q as string, r as string);
      } else if (!q && !p && r && !max && !min && !wdt) {
        offers = await offerFilteredByRating(q as string, r as string);
      } else if (q && !p && !r && max && min && !wdt) {
        offers = await offerFilteredByRemuneration(
          q as string,
          max as string,
          min as string
        );
      } else if (!q && !p && !r && max && min && !wdt) {
        offers = await offerFilteredByRemuneration(
          q as string,
          max as string,
          min as string
        );
      } else if (q && !p && !r && !max && !min && wdt) {
        offers = await offerFilteredByWorDurationTime(q as string, wdt as string);
      } else if (!q && !p && !r && !max && !min && wdt) {
        console.log("entre al filtro")
        offers = await offerFilteredByWorDurationTime(q as string, wdt as string);
      } else {
        offers = await offerAllFiltersOn(q as string, p as string, r as string, max as string, min as string, wdt as string);
      }
      res.json(offers);
    } catch (error) {
      next(error);
    }
  }
);

offer.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const offer: any = await getOfferById(id);
    let result = {
      ...offer,
      offersCount: offer.userClient.offers.length,
      workerName: offer.proposals[0]?.userWorker.name, //trae el nombre del trabajador de la primer proposal, no es util asi
    };
    return res.json(result);
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

offer.put("/state", async (req: Request, res: Response, next: NextFunction) => {
  const { id, state } = req.body;
  try {
      const offerState: String = await putOfferState(id, state);
      res.send(offerState);
  } catch (error) {
    next(error);
  }
});

offer.put(
  "/isActive",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id, isActive } = req.body;
    try {
        const offerState: string = await putOfferIsActive(id, isActive);
        res.send(offerState);  
    } catch (error) {
      next(error);
    }
  }
);

export default offer;
