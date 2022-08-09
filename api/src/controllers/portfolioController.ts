import { PortfolioType } from "../types";
const { Portfolio, UserWorker } = require("../db");

export const postNewPortfolio = async (
  portfolio: PortfolioType,
  id: string
): Promise<string> => {
  const worker = UserWorker.findByPk(id);
  const newPortfolio = await Portfolio.create(portfolio);
  await worker.addPortfolio(newPortfolio);
  return "Portfolio agregado con éxito";
};
