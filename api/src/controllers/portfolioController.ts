import { PortfolioType } from "../types";
const { Portfolio, UserWorker } = require("../db");

export async function postNewPortfolio(
  portfolio: PortfolioType,
  id: string
): Promise<string> {
  const worker = await UserWorker.findByPk(id);
  const newPortfolio = await Portfolio.create(portfolio);
  await worker.addPortfolio(newPortfolio);
  return "Portfolio agregado con éxito";
}

export async function updatePortfolio(
  idPortfolio: string,
  title: string,
  photo: string,
  portfolio_description: string,
): Promise<PortfolioType> {
  const data = { title, photo, portfolio_description };
  const portfolio = await Portfolio.findByPk(idPortfolio);
  if (!title || data.title === portfolio.title) delete data.title;
  if (!photo || data.photo ===  portfolio.photo) delete data.photo;
  if (!portfolio_description || data.portfolio_description === portfolio.portfolio_description) delete data.portfolio_description;
  await portfolio.set(data);
  await portfolio.save();
  return portfolio;
}
