import { WorkerType } from "../types";
<<<<<<< HEAD
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
=======
import { Op } from "sequelize";

const { UserWorker } = require("../db");

export async function workerFilteredByProfession(
  name,
  profession,
): Promise<WorkerType[]> {
  if (!name && profession) {
    const filteredByProfession = await UserWorker.findAll({
      where: {
        profession: {
          [Op.contains]: [profession],
        },
      },
    });
    return filteredByProfession;
  } else {
    const filteredByProfession = await UserWorker.findAll({
      where: {
>>>>>>> bb6b88afcb0a9b38ecb012339db351455856ac50
        name: {
          [Op.iLike]: `%${name}%`,
        },
        profession: {
          [Op.contains]: [profession],
<<<<<<< HEAD
        }
      }
    })
=======
        },
      },
    });
>>>>>>> bb6b88afcb0a9b38ecb012339db351455856ac50
    return filteredByProfession;
  }
}

<<<<<<< HEAD
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
=======
export async function workerFilteredByRating(
  name,
  rating,
): Promise<WorkerType[]> {
  if (!name && rating) {
    const filteredByRating = await UserWorker.findAll({
      where: {
        rating: {
          [Op.gte]: parseInt(rating),
        },
      },
    });
    return filteredByRating;
  } else {
    const filteredByRating = await UserWorker.findAll({
      where: {
>>>>>>> bb6b88afcb0a9b38ecb012339db351455856ac50
        name: {
          [Op.iLike]: `%${name}%`,
        },
        rating: {
<<<<<<< HEAD
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
=======
          [Op.gte]: parseInt(rating),
        },
      },
    });
    return filteredByRating;
  }
}

export async function workerAllfiltersOn(
  name,
  profession,
  rating,
): Promise<WorkerType[]> {
  if (!name && profession && rating) {
    const workerAllfiltersOn = await UserWorker.findAll({
      where: {
>>>>>>> bb6b88afcb0a9b38ecb012339db351455856ac50
        profession: {
          [Op.contains]: [profession],
        },
        rating: {
<<<<<<< HEAD
          [Op.gte]: parseInt(rating)
        }
      }
    })
    return workerAllfiltersOn;
  } else {
    const workerAllfiltersOn = await UserWorker.findAll({
/*       limit: 8 + 5 * multiplier, */
      where:{
=======
          [Op.gte]: parseInt(rating),
        },
      },
    });
    return workerAllfiltersOn;
  } else {
    const workerAllfiltersOn = await UserWorker.findAll({
      where: {
>>>>>>> bb6b88afcb0a9b38ecb012339db351455856ac50
        name: {
          [Op.iLike]: `%${name}%`,
        },
        profession: {
          [Op.contains]: [profession],
        },
        rating: {
<<<<<<< HEAD
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
=======
          [Op.gte]: parseInt(rating),
        },
      },
    });
    return workerAllfiltersOn;
  }
}
>>>>>>> bb6b88afcb0a9b38ecb012339db351455856ac50
