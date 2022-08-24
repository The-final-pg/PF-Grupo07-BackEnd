import express, { NextFunction, Request, Response } from "express";
import { PortfolioType } from "../types";
import { postNewPortfolio, updatePortfolio } from "../controllers/portfolioController";

const portfolio = express.Router();

portfolio.post("/:id", async (req: Request, res: Response, next: NextFunction) => {
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

portfolio.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  const id: string = req.params.id;
  const {
    title,
    photo,
    portfolio_description,
  }: {
    title: string;
    photo: string;
    portfolio_description: string;
  } = req.body;
  try {
    const portfolioUpdate: PortfolioType = await updatePortfolio(
      id,
      title,
      photo,
      portfolio_description,
    );
    res.json(portfolioUpdate);
  } catch (error) {
    next(error);
  }
});

export default portfolio;
