import { WorkerType } from "../types";
import { Op } from "sequelize";
const { UserWorker , Review, Proposal, Portfolio } = require("../db");

export async function getAllWorkers(): Promise<WorkerType[]> {
  const allWorkers = await UserWorker.findAll();
  return allWorkers;
}

export async function getWorkerByName(name): Promise<WorkerType[]> {
  const worker: WorkerType[] = await UserWorker.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
  });
  return worker;
}

export async function getWorkerById(id: string): Promise<WorkerType> {
  const workerById = await UserWorker.findByPk(
    id, {
    include: [Review, Proposal, Portfolio]
  }
  );
  return workerById;
}
