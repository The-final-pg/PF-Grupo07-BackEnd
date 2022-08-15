<<<<<<< HEAD
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
=======
import { WorkerType, OfferType } from "../types";
import { Op } from "sequelize";
const { UserWorker , Review, Proposal, Portfolio } = require("../db");
import { compareArrays } from "../services/CompareArraysEquality"

export async function getAllWorkers(): Promise<WorkerType[]> {
  const allWorkers = await UserWorker.findAll();
  return allWorkers;
}

export async function getWorkerByName(name): Promise<WorkerType[]> {
  const worker: WorkerType[] = await UserWorker.findAll({
>>>>>>> bb6b88afcb0a9b38ecb012339db351455856ac50
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
  });
  return worker;
<<<<<<< HEAD
};

export const getWorkerById = async (id: string): Promise<WorkerType> => {
  const workerById = await UserWorker.findByPk(
    id ,  {
    include: [ Review, Proposal, Portfolio ]
  }
  );
  return workerById;
};
=======
}

export async function getWorkerById(id: string): Promise<WorkerType> {
  const workerById = await UserWorker.findByPk(
    id, {
    include: [Review, Proposal, Portfolio]
  }
  );
  return workerById;
}

export async function updateWorkerProfile(
  id: string,
  name: string,
  born_date: Date,
  photo: string,
  profession: string[],
  skills: string[],
  favorites: OfferType[]
): Promise<WorkerType> {
  const data = { name, born_date, photo, profession, skills, favorites };
  const worker = await UserWorker.findByPk(id);
  if (!name || data.name === worker.name) delete data.name;
  if (!born_date || data.born_date === worker.born_date) delete data.born_date;
  if (!photo || data.photo === worker.photo) delete data.photo;
  if (!profession || compareArrays(data.profession, worker.profession)) delete data.profession;
  if (!skills || compareArrays(data.skills, worker.skills)) delete data.skills;
  await worker.set(data);
  await worker.save();
  return worker;
}

>>>>>>> bb6b88afcb0a9b38ecb012339db351455856ac50
