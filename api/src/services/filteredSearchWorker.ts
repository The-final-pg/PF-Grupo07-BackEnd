import { WorkerType } from "../types";
import { Op } from "sequelize";

const { UserWorker } = require("../db");

export async function workerFilteredByProfession(
  name: string,
  profession: string,
): Promise<WorkerType[]> {
  if (!name && profession) {
    const filteredByProfession = await UserWorker.findAll({
      where: {
        profession: {
          [Op.contains]: [profession],
        },
        isActive: true,
      },
    });
    return filteredByProfession;
  } else {
    const filteredByProfession = await UserWorker.findAll({
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
        profession: {
          [Op.contains]: [profession],
        },
        isActive: true,
      },
    });
    return filteredByProfession;
  }
}

export async function workerFilteredByRating(
  name: string,
  rating: string,
): Promise<WorkerType[]> {
  if (!name && rating) {
    const filteredByRating = await UserWorker.findAll({
      where: {
        rating: {
          [Op.gte]: parseInt(rating),
        },
        isActive: true,
      },
    });
    return filteredByRating;
  } else {
    const filteredByRating = await UserWorker.findAll({
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
        rating: {
          [Op.gte]: parseInt(rating),
        },
        isActive: true,
      },
    });
    return filteredByRating;
  }
}

export async function workerAllfiltersOn(
  name: string,
  profession: string,
  rating: string,
): Promise<WorkerType[]> {
  if (!name && profession && rating) {
    const workerAllfiltersOn = await UserWorker.findAll({
      where: {
        profession: {
          [Op.contains]: [profession],
        },
        rating: {
          [Op.gte]: parseInt(rating),
        },
        isActive: true,
      },
    });
    return workerAllfiltersOn;
  } else {
    const workerAllfiltersOn = await UserWorker.findAll({
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
        profession: {
          [Op.contains]: [profession],
        },
        rating: {
          [Op.gte]: parseInt(rating),
        },
        isActive: true,
      },
    });
    return workerAllfiltersOn;
  }
}
