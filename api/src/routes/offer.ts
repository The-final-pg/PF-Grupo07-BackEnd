import express, { NextFunction, Request, Response } from "express";
import { OfferType } from "../types";
import {
  getAllOffers,
  postOffer,
  getOfferById,
  getOffersBySearch,
  putOfferState,
<<<<<<< HEAD
=======
  putOfferIsActive,
>>>>>>> bb6b88afcb0a9b38ecb012339db351455856ac50
} from "../controllers/offerController";
import {
  offerFilteredByProfession,
  offerAllFiltersOn,
  offerFilteredByRating,
  offerFilteredByRemuneration,
<<<<<<< HEAD
=======
  offerFilteredByWorDurationTime
>>>>>>> bb6b88afcb0a9b38ecb012339db351455856ac50
} from "../services/filteredSearchOffer";

const offer = express.Router();

offer.get("/", async (_req: Request, res: Response, next: NextFunction) => {
<<<<<<< HEAD
/*   const multiplier: number = req.body.multiplier; */
  try {
    const offers: Array<OfferType> = await getAllOffers(/* multiplier */);
=======
  try {
    const offers: Array<OfferType> = await getAllOffers();
>>>>>>> bb6b88afcb0a9b38ecb012339db351455856ac50
    res.json(offers);
  } catch (error) {
    next(error);
  }
});

<<<<<<< HEAD
=======
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

>>>>>>> bb6b88afcb0a9b38ecb012339db351455856ac50
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

<<<<<<< HEAD
offer.get(
  "/search",
  async (req: Request, res: Response, next: NextFunction) => {
    const { q, p, r, max, min } = req.query;
  /*   const multiplier: number = req.body.multiplier; */
    try {
      let offers: OfferType[];
      if (q && !p && !r && !max && !min) {
        offers = await getOffersBySearch(q/* , multiplier */);
      } else if (q && p && !r && !max && !min) {
        offers = await offerFilteredByProfession(q, p/* , multiplier */);
      } else if (!q && p && !r && !max && !min) {
        offers = await offerFilteredByProfession(q, p/* , multiplier */);
      } else if (q && !p && r && !max && !min) {
        offers = await offerFilteredByRating(q, r/* , multiplier */);
      } else if (!q && !p && r && !max && !min) {
        offers = await offerFilteredByRating(q, r/* , multiplier */);
      } else if (q && !p && !r && max && min) {
        offers = await offerFilteredByRemuneration(q, max, min/* , multiplier */);
      } else if (!q && !p && !r && max && min) {
        offers = await offerFilteredByRemuneration(q, max, min/* , multiplier */);
      } else {
        offers = await offerAllFiltersOn(q, p, r, max, min/* , multiplier */);
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
        workerName: offer.proposals[0]?.userWorker.name, //trae el nombre del trabajador de la primer proposal, no es util asi
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
=======
offer.put("/state", async (req: Request, res: Response, next: NextFunction) => {
  const { id, state } = req.body;
  try {
      const offerState: String = await putOfferState(id, state);
      res.send(offerState);
>>>>>>> bb6b88afcb0a9b38ecb012339db351455856ac50
  } catch (error) {
    next(error);
  }
});

<<<<<<< HEAD
=======
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

>>>>>>> bb6b88afcb0a9b38ecb012339db351455856ac50
export default offer;
