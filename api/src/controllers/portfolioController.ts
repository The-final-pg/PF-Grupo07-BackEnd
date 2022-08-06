import { PortfolioType } from "../types";
const { Portfolio, UserWorker } = require("../db");

export const postNewPortfolio = async (
  portfolio: PortfolioType,
  idWorker: string
): Promise<string> => {
  const worker = UserWorker.findByPk(idWorker);
  const newPortfolio = await Portfolio.create(portfolio);
  await worker.addPortfolio(newPortfolio);
  return "Portfolio agregado con éxito";
};
