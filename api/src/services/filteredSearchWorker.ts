import { WorkerType } from "../types";
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
        name: {
          [Op.iLike]: `%${name}%`,
        },
        profession: {
          [Op.contains]: [profession],
        },
      },
    });
    return filteredByProfession;
  }
}

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
        name: {
          [Op.iLike]: `%${name}%`,
        },
        rating: {
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
        profession: {
          [Op.contains]: [profession],
        },
        rating: {
          [Op.gte]: parseInt(rating),
        },
      },
    });
    return workerAllfiltersOn;
  } else {
    const workerAllfiltersOn = await UserWorker.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
        profession: {
          [Op.contains]: [profession],
        },
        rating: {
          [Op.gte]: parseInt(rating),
        },
      },
    });
    return workerAllfiltersOn;
  }
}
