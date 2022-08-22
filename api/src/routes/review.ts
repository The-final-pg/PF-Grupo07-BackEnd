import express, { NextFunction, Request, Response } from "express";
import { postReviewClient, postReviewWorker } from "../controllers/reviewController";

const review = express.Router();

review.post("/client", async (req: Request, res: Response, next: NextFunction) => {
  //recibe id del client que es destinatario de la review
  const { id, idOffer, review } = req.body;
  try {
    let response: string;
    //si la review va dirigida al Client, de ejecuta la funcion de review para clients
    response = await postReviewClient(id, idOffer, review);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

review.post("/worker", async (req: Request, res: Response, next: NextFunction) => {
  //recibe id del worker qeu es destinatario de la review
  const { id, idOffer, review } = req.body;
  try {
    let response: string;
    //si la review va dirigida al Worker, de ejecuta la funcion de review para workers
    response = await postReviewWorker(id, idOffer, review);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

export default review;