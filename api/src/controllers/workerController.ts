import * as types from "../types";
const {UserWorker/* , Review, Proposal, Portfolio */} = require("../db");

export const getAllWorkers = async (): Promise<types.worker[]> => {
  const allWorkers = await UserWorker.findAll();
  return allWorkers;
};

export const getWorkerById = async (id: string): Promise<types.worker> => {
  const workerById = await UserWorker.findByPk(parseInt(id) /*,  {
    include: [ Review, Proposal, Portfolio ]
  } */ );
  return workerById;
}; 



