import { PortfolioType } from "../types";
const { Portfolio, UserWorker } = require("../db");

<<<<<<< HEAD
export async function postNewPortfolio(portfolio: PortfolioType,
  idWorker: string): Promise<string> {
  const worker = UserWorker.findByPk(idWorker);
  const newPortfolio = await Portfolio.create(portfolio);
  await worker.addPortfolio(newPortfolio);
  return "Portfolio agregado con éxito";
}
=======
export const postNewPortfolio = async (
  portfolio: PortfolioType,
  idWorker: string
): Promise<string> => {
  const worker = await UserWorker.findByPk(idWorker);
  const newPortfolio = await Portfolio.create(portfolio);
  await worker.addPortfolio(newPortfolio);
  return "Portfolio agregado con éxito";
};
>>>>>>> 707266edd67172ce2b7f36f2b5f67c9667ca0352
