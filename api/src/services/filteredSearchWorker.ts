import { WorkerType } from "../types";
import { Op} from 'sequelize';

const { UserWorker } = require("../db");

export const workerFilteredByProfession = async (name, profession): Promise<WorkerType[]> => {
  const filteredByProfession = await UserWorker.findAll({
    where:{
      name: {
        [Op.iLike]: `%${name}%`,
      },
      profession: {
        [Op.contains]: [profession],
      }
    }
  })
  return filteredByProfession;
}

export const workerFilteredByRating = async (name, rating): Promise<WorkerType[]> => {
  const filteredByRating = await UserWorker.findAll({
    where:{
      name: {
        [Op.iLike]: `%${name}%`,
      },
      rating: {
        [Op.gte]: parseInt(rating)
      }
    }
  })
  return filteredByRating;
};

export const workerAllfiltersOn = async (name, profession, rating): Promise<WorkerType[]> => {
  const workerAllfiltersOn = await UserWorker.findAll({
    where:{
      name: {
        [Op.iLike]: `%${name}%`,
      },
      profession: {
        [Op.contains]: [profession],
      },
      rating: {
        [Op.gte]: parseInt(rating)
      }
    }
  })
  return workerAllfiltersOn;
};
