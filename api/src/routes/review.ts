import express, { NextFunction, Request, Response } from "express";
import { postReview } from "../controllers/reviewController";

const review = express.Router();

review.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const { idClient, idWorker, idOffer, ...review } = req.body;
  try {
    let response: string;
    response = await postReview(idClient, idWorker, idOffer, review);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

export default review;