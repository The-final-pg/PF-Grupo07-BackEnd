import { WorkerType } from "../types";
import { Op } from "sequelize";
const { UserWorker , Review, Proposal, Portfolio } = require("../db");

export const getAllWorkers = async (): Promise<WorkerType[]> => {
  const allWorkers = await UserWorker.findAll();
  return allWorkers;
};

export const getWorkerByName = async (name: string): Promise<WorkerType[]> => {
  const worker: WorkerType[] = await UserWorker.findAll({
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
