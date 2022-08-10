import { WorkerType } from "../types";
import { Op} from 'sequelize';

const { UserWorker } = require("../db");

export const workerFilteredByProfession = async (name, profession/* , multiplier: number = 0 */): Promise<WorkerType[]> => {
  if (!name && profession) {
    const filteredByProfession = await UserWorker.findAll({
/*       limit: 8 + 5 * multiplier, */
      where:{
        profession: {
          [Op.contains]: [profession],
        }
      }
    })
    return filteredByProfession;
  } else {
    const filteredByProfession = await UserWorker.findAll({
/*       limit: 8 + 5 * multiplier, */
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
}

export const workerFilteredByRating = async (name, rating/* , multiplier: number = 0 */): Promise<WorkerType[]> => {
  if (!name && rating) {
    const filteredByRating = await UserWorker.findAll({
/*       limit: 8 + 5 * multiplier, */
      where:{
        rating: {
          [Op.gte]: parseInt(rating)
        }
      }
    })
    return filteredByRating;
  } else {
    const filteredByRating = await UserWorker.findAll({
/*       limit: 8 + 5 * multiplier, */
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
  }
};

export const workerAllfiltersOn = async (name, profession, rating/* , multiplier: number = 0 */): Promise<WorkerType[]> => {
  if (!name && profession && rating) {
    const workerAllfiltersOn = await UserWorker.findAll({
/*       limit: 8 + 5 * multiplier, */
      where:{
        profession: {
          [Op.contains]: [profession],
        },
        rating: {
          [Op.gte]: parseInt(rating)
        }
      }
    })
    return workerAllfiltersOn;
  } else {
    const workerAllfiltersOn = await UserWorker.findAll({
/*       limit: 8 + 5 * multiplier, */
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
  }
  const workerAllfiltersOn = await UserWorker.findAll({
/*     limit: 8 + 5 * multiplier, */
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
