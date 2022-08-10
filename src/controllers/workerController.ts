import { WorkerType } from "../types";
import { Op } from "sequelize";
const { UserWorker , Review, Proposal, Portfolio } = require("../db");

export const getAllWorkers = async (/* multiplier: number = 0 */): Promise<WorkerType[]> => {
  const allWorkers = await UserWorker.findAll({
/*     limit: 8 + 5 * multiplier, */
  });
  return allWorkers;
};

export const getWorkerByName = async (name/* , multiplier: number = 0 */): Promise<WorkerType[]> => {
  const worker: WorkerType[] = await UserWorker.findAll({
/*     limit: 8 + 5 * multiplier, */
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
  });
  return worker;
};

export const getWorkerById = async (id: string): Promise<WorkerType> => {
  const workerById = await UserWorker.findByPk(
    id ,  {
    include: [ Review, Proposal, Portfolio ]
  }
  );
  return workerById;
};
