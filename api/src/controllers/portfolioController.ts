import * as types from "../types"
const { Portfolio, UserWorker } = require("../db")

export const postNewPortfolio = async (portfolio: types.portfolio, idWorker: string): Promise<string> => {
    const worker = UserWorker.findByPk(idWorker);
    const newPortfolio = await Portfolio.create(portfolio);
    await worker.addPortfolio(newPortfolio);
    return "Portfolio agregado con éxito";
}
