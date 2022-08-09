import express, { NextFunction, Request, Response } from "express";
import { PortfolioType } from "../types";
import { postNewPortfolio } from "../controllers/portfolioController";

const portfolio = express.Router();

portfolio.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const id: string = req.params.id;
  const portfolio: PortfolioType = req.body;
  try {
    let response: string;
    response = await postNewPortfolio(portfolio, id);
    res.send(response);
  } catch (error) {
    next(error);
  }
});

export default portfolio;
