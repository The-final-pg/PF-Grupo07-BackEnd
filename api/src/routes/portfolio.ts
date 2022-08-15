import express, { NextFunction, Request, Response } from "express";
import { PortfolioType } from "../types";
<<<<<<< HEAD
import { postNewPortfolio } from "../controllers/portfolioController";

const portfolio = express.Router();

portfolio.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const idWorker: string = req.params.idWorker;
  const portfolio: PortfolioType = req.body;
  try {
    let response: string;
    response = await postNewPortfolio(portfolio, idWorker);
=======
import { postNewPortfolio, updatePortfolio } from "../controllers/portfolioController";

const portfolio = express.Router();

portfolio.post("/:id", async (req: Request, res: Response, next: NextFunction) => {
  const id: string = req.params.id;
  const portfolio: PortfolioType = req.body;
  try {
    let response: string;
    response = await postNewPortfolio(portfolio, id);
>>>>>>> bb6b88afcb0a9b38ecb012339db351455856ac50
    res.send(response);
  } catch (error) {
    next(error);
  }
});

<<<<<<< HEAD
export default portfolio;
=======
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
>>>>>>> bb6b88afcb0a9b38ecb012339db351455856ac50
