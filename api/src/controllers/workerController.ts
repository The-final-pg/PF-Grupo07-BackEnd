import { WorkerType, OfferType } from "../types";
import { Op } from "sequelize";
const { UserWorker, Review, Proposal, Portfolio } = require("../db");
import { compareArrays } from "../services/CompareArraysEquality";

export async function getAllWorkers(): Promise<WorkerType[]> {
  const allWorkers = await UserWorker.findAll({
    where: {
      isActive: true,
      }
    });
  return allWorkers;
}

export async function getWorkerByName(name: string): Promise<WorkerType[]> {
  const worker: WorkerType[] = await UserWorker.findAll({
    where: {
      [Op.or]: [
        {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
        {
          lastName: {
            [Op.iLike]: `%${name}%`,
          },
        },
      ],
      isActive: true,
    },
  });
  return worker;
}

export async function getWorkerById(id: string): Promise<WorkerType> {
  const workerById = await UserWorker.findByPk(id, {
    include: [Review, Proposal, Portfolio],
  });
  return workerById;
}

export async function updateWorkerProfile(
  id: string,
  name: string,
  lastName: string,
  born_date: Date,
  photo: string,
  profession: string[],
  skills: string[],
  favorites: OfferType[], 
  description: string,
): Promise<WorkerType> {
  const data = {
    name,
    lastName,
    born_date,
    photo,
    profession,
    skills,
    favorites,
    description,
  };
  const worker = await UserWorker.findByPk(id);
  if (!name || data.name === worker.name) delete data.name;
  if (!lastName || data.lastName === worker.lastName) delete data.lastName;
  if (!born_date || data.born_date === worker.born_date) delete data.born_date;
  if (!photo || data.photo === worker.photo) delete data.photo;
  if (!profession || compareArrays(data.profession, worker.profession))
    delete data.profession;
  if (!skills || compareArrays(data.skills, worker.skills)) delete data.skills;
  if (!favorites) delete data.favorites;
  if (!description) delete data.description;
  await worker.set(data);
  await worker.save();
  return worker;
};

export async function putWorkerPremium (id: string, premium: boolean): Promise<string> {
  const worker: any = await UserWorker.findByPk(id);
  await worker.set({premium: premium});
  await worker.save();
  return "Ya tienes cuenta premium!";
}

export async function addBankDataWorker (id: string, bank_data: JSON): Promise<string> {
  
  await UserWorker.update({
    bank_data: bank_data,
    where: {
      id: id,
    }
  })
  return "Datos bancarios cargados exitosamente"
}
