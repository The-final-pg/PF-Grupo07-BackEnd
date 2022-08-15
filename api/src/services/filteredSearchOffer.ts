import { OfferType } from "../types";
import { Op } from "sequelize";

const { Offer, UserClient } = require("../db");

<<<<<<< HEAD
export const offerFilteredByProfession = async (
  input,
  profession,
/*   multiplier: number = 0 */
): Promise<OfferType[]> => {
  if (!input && profession){
    console.log('Estoy aca 1')
    const filteredByProfession = await Offer.findAll({
/*       limit: 8 + 5 * multiplier , */
=======
export async function offerFilteredByProfession(
  input: string,
  profession: string,
): Promise<OfferType[]> {
  if (!input && profession) {
    console.log("Estoy aca 1");
    const filteredByProfession = await Offer.findAll({
>>>>>>> bb6b88afcb0a9b38ecb012339db351455856ac50
      where: {
        profession: {
          [Op.contains]: [profession],
        },
      },
      include: UserClient,
    });
    return filteredByProfession;
<<<<<<< HEAD
  }
  else {

    const filteredByProfession = await Offer.findAll({
/*       limit: 8 + 5 * multiplier, */
=======
  } else {
    const filteredByProfession = await Offer.findAll({
>>>>>>> bb6b88afcb0a9b38ecb012339db351455856ac50
      where: {
        [Op.or]: [
          {
            title: {
              [Op.iLike]: `%${input}%`,
            },
          },
          {
            offer_description: {
              [Op.iLike]: `%${input}%`,
            },
          },
        ],
        profession: {
          [Op.contains]: [profession],
        },
      },
      include: UserClient,
    });
    return filteredByProfession;
  }
<<<<<<< HEAD
};

export const offerFilteredByRating = async (
  input,
  rating,
/*   multiplier: number = 0 */
): Promise<OfferType[]> => {
  if (!input && rating){
    const filteredByRating = await Offer.findAll({
/*       limit: 8 + 5 * multiplier, */
=======
}

export async function offerFilteredByRating(
  input: string,
  rating: string,
): Promise<OfferType[]> {
  if (!input && rating) {
    const filteredByRating = await Offer.findAll({
>>>>>>> bb6b88afcb0a9b38ecb012339db351455856ac50
      include: {
        model: UserClient,
        where: {
          rating: {
            [Op.gte]: parseInt(rating),
          },
        },
      },
    });
    return filteredByRating;
<<<<<<< HEAD
  }
  else {
    const filteredByRating = await Offer.findAll({
 /*      limit: 8 + 5 * multiplier, */
=======
  } else {
    const filteredByRating = await Offer.findAll({
>>>>>>> bb6b88afcb0a9b38ecb012339db351455856ac50
      where: {
        [Op.or]: [
          {
            title: {
              [Op.iLike]: `%${input}%`,
            },
          },
          {
            offer_description: {
              [Op.iLike]: `%${input}%`,
            },
          },
        ],
      },
      include: {
        model: UserClient,
        where: {
          rating: {
            [Op.gte]: parseInt(rating),
          },
        },
      },
    });
    return filteredByRating;
  }
<<<<<<< HEAD
};

export const offerFilteredByRemuneration = async (
  input,
  remMax,
  remMin,
/*   multiplier: number = 0 */
): Promise<OfferType[]> => {
  if (!input && remMax && remMin) {
  const findedByName = await Offer.findAll({
/*     limit: 8 + 5 * multiplier, */
    where: {
      max_remuneration: {
        [Op.lte]: parseInt(remMax),
      },
      min_remuneration: {
        [Op.gte]: parseInt(remMin),
      },
    },
    include: UserClient,
  });

  return findedByName;
  }
  else {
    const findedByName = await Offer.findAll({
/*       limit: 8 + 5 * multiplier, */
=======
}

export async function offerFilteredByRemuneration(
  input: string,
  remMax: string,
  remMin: string,
): Promise<OfferType[]> {
  if (!input && remMax && remMin) {
    const findedByName = await Offer.findAll({
      where: {
        max_remuneration: {
          [Op.lte]: parseInt(remMax),
        },
        min_remuneration: {
          [Op.gte]: parseInt(remMin),
        },
      },
      include: UserClient,
    });

    return findedByName;
  } else {
    const findedByName = await Offer.findAll({
>>>>>>> bb6b88afcb0a9b38ecb012339db351455856ac50
      where: {
        [Op.or]: [
          {
            title: {
              [Op.iLike]: `%${input}%`,
            },
          },
          {
            offer_description: {
              [Op.iLike]: `%${input}%`,
            },
          },
        ],
        max_remuneration: {
          [Op.lte]: parseInt(remMax),
        },
        min_remuneration: {
          [Op.gte]: parseInt(remMin),
        },
      },
      include: UserClient,
    });
<<<<<<< HEAD
  
=======

>>>>>>> bb6b88afcb0a9b38ecb012339db351455856ac50
    return findedByName;
  }
};

<<<<<<< HEAD
export const offerAllFiltersOn = async (
  input,
  profession,
  rating,
  remMax,
  remMin,
/*   multiplier: number = 0 */
): Promise<OfferType[]> => {
  if (input && profession && rating && remMax && remMin) {
    const allFiltersOn = await Offer.findAll({
/*       limit: 8 + 5 * multiplier, */
      where: {
        [Op.or]: [
          {
            title: {
              [Op.iLike]: `%${input}%`,
            },
          },
          {
            offer_description: {
              [Op.iLike]: `%${input}%`,
            },
          },
        ],
        profession: {
          [Op.contains]: [profession],
        },
        max_remuneration: {
          [Op.lte]: parseInt(remMax),
        },
        min_remuneration: {
          [Op.gte]: parseInt(remMin),
        },
      },
      include: {
        model: UserClient,
        where: {
          rating: {
            [Op.gte]: parseInt(rating),
          },
        },
      },
    });

    return allFiltersOn;
  }
  if (input && !profession && rating && remMax && remMin) {
    const allFiltersOn = await Offer.findAll({
/*       limit: 8 + 5 * multiplier, */
      where: {
        [Op.or]: [
          {
            title: {
              [Op.iLike]: `%${input}%`,
            },
          },
          {
            offer_description: {
              [Op.iLike]: `%${input}%`,
            },
          },
        ],
        max_remuneration: {
          [Op.lte]: parseInt(remMax),
        },
        min_remuneration: {
          [Op.gte]: parseInt(remMin),
        },
      },
      include: {
        model: UserClient,
        where: {
          rating: {
            [Op.gte]: parseInt(rating),
          },
        },
      },
    });

    return allFiltersOn;
  }
  if (input && profession && !rating && remMax && remMin) {
    const allFiltersOn = await Offer.findAll({
/*       limit: 8 + 5 * multiplier, */
      where: {
        [Op.or]: [
          {
            title: {
              [Op.iLike]: `%${input}%`,
            },
          },
          {
            offer_description: {
              [Op.iLike]: `%${input}%`,
            },
          },
        ],
        profession: {
          [Op.contains]: [profession],
        },
        max_remuneration: {
          [Op.lte]: parseInt(remMax),
        },
        min_remuneration: {
          [Op.gte]: parseInt(remMin),
        },
      },
      include: {
        model: UserClient,
      },
    });

    return allFiltersOn;
  }
  
  if (input && profession && rating && !remMax && !remMin) {
    const allFiltersOn = await Offer.findAll({
/*       limit: 8 + 5 * multiplier, */
      where: {
        [Op.or]: [
          {
            title: {
              [Op.iLike]: `%${input}%`,
            },
          },
          {
            offer_description: {
              [Op.iLike]: `%${input}%`,
            },
          },
        ],
        profession: {
          [Op.contains]: [profession],
        },
      },
      include: {
        model: UserClient,
        where: {
          rating: {
            [Op.gte]: parseInt(rating),
          },
        },
      },
    });

    return allFiltersOn;
  }

  if (!input && profession && rating && remMax && remMin) {
    const allFiltersOn = await Offer.findAll({
  /*     limit: 8 + 5 * multiplier, */
      where: {
        profession: {
          [Op.contains]: [profession],
        },
        max_remuneration: {
          [Op.lte]: parseInt(remMax),
        },
        min_remuneration: {
          [Op.gte]: parseInt(remMin),
        },
      },
      include: {
        model: UserClient,
        where: {
          rating: {
            [Op.gte]: parseInt(rating),
          },
        },
      },
    });

    return allFiltersOn;
  }

  if (!input && !profession && rating && remMax && remMin) {
    const allFiltersOn = await Offer.findAll({
  /*     limit: 8 + 5 * multiplier, */
      where: {
        max_remuneration: {
          [Op.lte]: parseInt(remMax),
        },
        min_remuneration: {
          [Op.gte]: parseInt(remMin),
        },
      },
      include: {
        model: UserClient,
        where: {
          rating: {
            [Op.gte]: parseInt(rating),
          },
        },
      },
    });

    return allFiltersOn;
  }

  if (!input && profession && !rating && remMax && remMin) {
    const allFiltersOn = await Offer.findAll({
/*       limit: 8 + 5 * multiplier, */
      where: {
        profession: {
          [Op.contains]: [profession],
        },
        max_remuneration: {
          [Op.lte]: parseInt(remMax),
        },
        min_remuneration: {
          [Op.gte]: parseInt(remMin),
        },
      },
      include: {
        model: UserClient,
      },
    });

    return allFiltersOn;
  }

  if (!input && profession && rating && !remMax && !remMin) {
    const allFiltersOn = await Offer.findAll({
/*       limit: 8 + 5 * multiplier, */
      where: {
        
        profession: {
          [Op.contains]: [profession],
        },
      },
      include: {
        model: UserClient,
        where: {
          rating: {
            [Op.gte]: parseInt(rating),
          },
        },
      },
    });

    return allFiltersOn;
  }
};
=======
export async function offerFilteredByWorDurationTime(
  input: string,
  work_duration_time: string
): Promise<OfferType[]> {
  if (!input && work_duration_time) {
    const findedByWorkDurationTime: OfferType[] = await Offer.findAll({
      where: {
        work_duration_time: {
          [Op.eq]: work_duration_time,
        },
      },
      include: UserClient,
    });
    return findedByWorkDurationTime;
  } else {
      const findedByWorkDurationTime: OfferType[] = await Offer.findAll({
        where: {
          [Op.or]: [
            {
              title: {
                [Op.iLike]: `%${input}%`,
              },
            },
            {
              offer_description: {
                [Op.iLike]: `%${input}%`,
              },
            },
          ],
          work_duration_time: {
            [Op.eq]: work_duration_time,
          },
        },
        include: UserClient,
      });
      return findedByWorkDurationTime;
  }
};

export async function offerAllFiltersOn(
  input: string,
  profession: string,
  rating: string,
  remMax: string,
  remMin: string,
  work_duration_time: string,
): Promise<OfferType[]> {
  if (input && profession && rating && remMax && remMin && work_duration_time) {
    const allFiltersOn = await Offer.findAll({
      where: {
        [Op.or]: [
          {
            title: {
              [Op.iLike]: `%${input}%`,
            },
          },
          {
            offer_description: {
              [Op.iLike]: `%${input}%`,
            },
          },
        ],
        profession: {
          [Op.contains]: [profession],
        },
        max_remuneration: {
          [Op.lte]: parseInt(remMax),
        },
        min_remuneration: {
          [Op.gte]: parseInt(remMin),
        },
        work_duration_time: {
          [Op.eq]: work_duration_time,
        },
      },
      include: {
        model: UserClient,
        where: {
          rating: {
            [Op.gte]: parseInt(rating),
          },
        },
      },
    });
    return allFiltersOn;
  }
  if (input && !profession && rating && remMax && remMin && work_duration_time) {
    const allFiltersOn = await Offer.findAll({
      where: {
        [Op.or]: [
          {
            title: {
              [Op.iLike]: `%${input}%`,
            },
          },
          {
            offer_description: {
              [Op.iLike]: `%${input}%`,
            },
          },
        ],
        max_remuneration: {
          [Op.lte]: parseInt(remMax),
        },
        min_remuneration: {
          [Op.gte]: parseInt(remMin),
        },
        work_duration_time: {
          [Op.eq]: work_duration_time,
        },
      },
      include: {
        model: UserClient,
        where: {
          rating: {
            [Op.gte]: parseInt(rating),
          },
        },
      },
    });
    return allFiltersOn;
  }
  if (input && profession && !rating && remMax && remMin && work_duration_time) {
    const allFiltersOn = await Offer.findAll({
      where: {
        [Op.or]: [
          {
            title: {
              [Op.iLike]: `%${input}%`,
            },
          },
          {
            offer_description: {
              [Op.iLike]: `%${input}%`,
            },
          },
        ],
        profession: {
          [Op.contains]: [profession],
        },
        max_remuneration: {
          [Op.lte]: parseInt(remMax),
        },
        min_remuneration: {
          [Op.gte]: parseInt(remMin),
        },
        work_duration_time: {
          [Op.eq]: work_duration_time,
        },
      },
      include: {
        model: UserClient,
      },
    });
    return allFiltersOn;
  }
  if (input && profession && rating && !remMax && !remMin && work_duration_time) {
    const allFiltersOn = await Offer.findAll({
      where: {
        [Op.or]: [
          {
            title: {
              [Op.iLike]: `%${input}%`,
            },
          },
          {
            offer_description: {
              [Op.iLike]: `%${input}%`,
            },
          },
        ],
        profession: {
          [Op.contains]: [profession],
        },
        work_duration_time: {
          [Op.eq]: work_duration_time,
        },
      },
      include: {
        model: UserClient,
        where: {
          rating: {
            [Op.gte]: parseInt(rating),
          },
        },
      },
    });
    return allFiltersOn;
  }
  if (input && profession && rating && remMax && remMin && !work_duration_time) {
    const allFiltersOn = await Offer.findAll({
      where: {
        [Op.or]: [
          {
            title: {
              [Op.iLike]: `%${input}%`,
            },
          },
          {
            offer_description: {
              [Op.iLike]: `%${input}%`,
            },
          },
        ],
        profession: {
          [Op.contains]: [profession],
        },
        max_remuneration: {
          [Op.lte]: parseInt(remMax),
        },
        min_remuneration: {
          [Op.gte]: parseInt(remMin),
        },
      },
      include: {
        model: UserClient,
        where: {
          rating: {
            [Op.gte]: parseInt(rating),
          },
        },
      },
    });
    return allFiltersOn;
  }
  if (!input && profession && rating && remMax && remMin && work_duration_time) {
    const allFiltersOn = await Offer.findAll({
      where: {
        profession: {
          [Op.contains]: [profession],
        },
        max_remuneration: {
          [Op.lte]: parseInt(remMax),
        },
        min_remuneration: {
          [Op.gte]: parseInt(remMin),
        },
        work_duration_time: {
          [Op.eq]: work_duration_time,
        },
      },
      include: {
        model: UserClient,
        where: {
          rating: {
            [Op.gte]: parseInt(rating),
          },
        },
      },
    });

    return allFiltersOn;
  }
  if (!input && !profession && rating && remMax && remMin && work_duration_time) {
    const allFiltersOn = await Offer.findAll({
      where: {
        max_remuneration: {
          [Op.lte]: parseInt(remMax),
        },
        min_remuneration: {
          [Op.gte]: parseInt(remMin),
        },
        work_duration_time: {
          [Op.eq]: work_duration_time,
        },
      },
      include: {
        model: UserClient,
        where: {
          rating: {
            [Op.gte]: parseInt(rating),
          },
        },
      },
    });
    return allFiltersOn;
  }
  if (!input && profession && !rating && remMax && remMin && work_duration_time) {
    const allFiltersOn = await Offer.findAll({
      where: {
        profession: {
          [Op.contains]: [profession],
        },
        max_remuneration: {
          [Op.lte]: parseInt(remMax),
        },
        min_remuneration: {
          [Op.gte]: parseInt(remMin),
        },
        work_duration_time: {
          [Op.eq]: work_duration_time,
        },
      },
      include: {
        model: UserClient,
      },
    });
    return allFiltersOn;
  }
  if (!input && profession && rating && !remMax && !remMin && work_duration_time) {
    const allFiltersOn = await Offer.findAll({
      where: {
        profession: {
          [Op.contains]: [profession],
        },
        work_duration_time: {
          [Op.eq]: work_duration_time,
        },
      },
      include: {
        model: UserClient,
        where: {
          rating: {
            [Op.gte]: parseInt(rating),
          },
        },
      },
    });

    return allFiltersOn;
  }
  if (!input && profession && rating && remMax && remMin && !work_duration_time) {
    const allFiltersOn = await Offer.findAll({
      where: {
        profession: {
          [Op.contains]: [profession],
        },
        max_remuneration: {
          [Op.lte]: parseInt(remMax),
        },
        min_remuneration: {
          [Op.gte]: parseInt(remMin),
        },
      },
      include: {
        model: UserClient,
        where: {
          rating: {
            [Op.gte]: parseInt(rating),
          },
        },
      },
    });

    return allFiltersOn;
  }
  if (input && !profession && !rating && remMax && remMin && work_duration_time) {
    const allFiltersOn = await Offer.findAll({
      where: {
        [Op.or]: [
          {
            title: {
              [Op.iLike]: `%${input}%`,
            },
          },
          {
            offer_description: {
              [Op.iLike]: `%${input}%`,
            },
          },
        ],
        max_remuneration: {
          [Op.lte]: parseInt(remMax),
        },
        min_remuneration: {
          [Op.gte]: parseInt(remMin),
        },
        work_duration_time: {
          [Op.eq]: work_duration_time,
        },
      },
      include: UserClient,
    });
    return allFiltersOn;
  }
  if (input && !profession && rating && !remMax && !remMin && work_duration_time) {
    const allFiltersOn = await Offer.findAll({
      where: {
        [Op.or]: [
          {
            title: {
              [Op.iLike]: `%${input}%`,
            },
          },
          {
            offer_description: {
              [Op.iLike]: `%${input}%`,
            },
          },
        ],
        work_duration_time: {
          [Op.eq]: work_duration_time,
        },
      },
      include: {
        model: UserClient,
        where: {
          rating: {
            [Op.gte]: parseInt(rating),
          },
        },
      },
    });
    return allFiltersOn;
  }
  if (input && !profession && rating && remMax && remMin && !work_duration_time) {
    const allFiltersOn = await Offer.findAll({
      where: {
        [Op.or]: [
          {
            title: {
              [Op.iLike]: `%${input}%`,
            },
          },
          {
            offer_description: {
              [Op.iLike]: `%${input}%`,
            },
          },
        ],
        max_remuneration: {
          [Op.lte]: parseInt(remMax),
        },
        min_remuneration: {
          [Op.gte]: parseInt(remMin),
        },
      },
      include: {
        model: UserClient,
        where: {
          rating: {
            [Op.gte]: parseInt(rating),
          },
        },
      },
    });
    return allFiltersOn;
  }
  if (input && profession && !rating && !remMax && !remMin && work_duration_time) {
    const allFiltersOn = await Offer.findAll({
      where: {
        [Op.or]: [
          {
            title: {
              [Op.iLike]: `%${input}%`,
            },
          },
          {
            offer_description: {
              [Op.iLike]: `%${input}%`,
            },
          },
        ],
        profession: {
          [Op.contains]: [profession],
        },
        work_duration_time: {
          [Op.eq]: work_duration_time,
        },
      },
      include: {
        model: UserClient,
      },
    });
    return allFiltersOn;
  }
  if (input && profession && !rating && remMax && remMin && !work_duration_time) {
    const allFiltersOn = await Offer.findAll({
      where: {
        [Op.or]: [
          {
            title: {
              [Op.iLike]: `%${input}%`,
            },
          },
          {
            offer_description: {
              [Op.iLike]: `%${input}%`,
            },
          },
        ],
        profession: {
          [Op.contains]: [profession],
        },
        max_remuneration: {
          [Op.lte]: parseInt(remMax),
        },
        min_remuneration: {
          [Op.gte]: parseInt(remMin),
        },
      },
      include: {
        model: UserClient,
      },
    });
    return allFiltersOn;
  }
  if (input && profession && rating && !remMax && !remMin && !work_duration_time) {
    const allFiltersOn = await Offer.findAll({
      where: {
        [Op.or]: [
          {
            title: {
              [Op.iLike]: `%${input}%`,
            },
          },
          {
            offer_description: {
              [Op.iLike]: `%${input}%`,
            },
          },
        ],
        profession: {
          [Op.contains]: [profession],
        },
      },
      include: {
        model: UserClient,
        where: {
          rating: {
            [Op.gte]: parseInt(rating),
          },
        },
      },
    });
    return allFiltersOn;
  }
  if (!input && !profession && !rating && remMax && remMin && work_duration_time) {
    const allFiltersOn = await Offer.findAll({
      where: {
        max_remuneration: {
          [Op.lte]: parseInt(remMax),
        },
        min_remuneration: {
          [Op.gte]: parseInt(remMin),
        },
        work_duration_time: {
          [Op.eq]: work_duration_time,
        },
      },
      include:  UserClient,
    });
    return allFiltersOn;
  }
  if (!input && !profession && rating && !remMax && !remMin && work_duration_time) {
    const allFiltersOn = await Offer.findAll({
      where: {
        work_duration_time: {
          [Op.eq]: work_duration_time,
        },
      },
      include: {
        model: UserClient,
        where: {
          rating: {
            [Op.gte]: parseInt(rating),
          },
        },
      },
    });
    return allFiltersOn;
  }
  if (!input && !profession && rating && remMax && remMin && !work_duration_time) {
    const allFiltersOn = await Offer.findAll({
      where: {
        max_remuneration: {
          [Op.lte]: parseInt(remMax),
        },
        min_remuneration: {
          [Op.gte]: parseInt(remMin),
        },
      },
      include: {
        model: UserClient,
        where: {
          rating: {
            [Op.gte]: parseInt(rating),
          },
        },
      },
    });
    return allFiltersOn;
  }
  if (!input && profession && !rating && !remMax && !remMin && work_duration_time) {
    const allFiltersOn = await Offer.findAll({
      where: {
        profession: {
          [Op.contains]: [profession],
        },
        work_duration_time: {
          [Op.eq]: work_duration_time,
        },
      },
      include: {
        model: UserClient,
      },
    });
    return allFiltersOn;
  }
  if (!input && profession && !rating && remMax && remMin && !work_duration_time) {
    const allFiltersOn = await Offer.findAll({
      where: {
        profession: {
          [Op.contains]: [profession],
        },
        max_remuneration: {
          [Op.lte]: parseInt(remMax),
        },
        min_remuneration: {
          [Op.gte]: parseInt(remMin),
        },
      },
      include: {
        model: UserClient,
      },
    });
    return allFiltersOn;
  }
  if (!input && profession && rating && !remMax && !remMin && !work_duration_time) {
    const allFiltersOn = await Offer.findAll({
      where: {
        profession: {
          [Op.contains]: [profession],
        },
      },
      include: {
        model: UserClient,
        where: {
          rating: {
            [Op.gte]: parseInt(rating),
          },
        },
      },
    });

    return allFiltersOn;
  }
}
>>>>>>> bb6b88afcb0a9b38ecb012339db351455856ac50
