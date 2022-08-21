import { OfferType } from "../types";
import { Op } from "sequelize";

const { Offer, UserClient } = require("../db");

export async function offerFilteredByProfession(
  input: string,
  profession: string,
): Promise<OfferType[]> {
  if (!input && profession) {
    const filteredByProfession = await Offer.findAll({
      where: {
        profession: {
          [Op.contains]: [profession],
        },
        isActive: true,
      },
      include: UserClient,
    });
    return filteredByProfession;
  } else {
    const filteredByProfession = await Offer.findAll({
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
        isActive: true,
      },
      include: UserClient,
    });
    return filteredByProfession;
  }
}

export async function offerFilteredByRating(
  input: string,
  rating: string,
): Promise<OfferType[]> {
  if (!input && rating) {
    const filteredByRating = await Offer.findAll({
      where: {
        isActive: true,
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
  } else {
    const filteredByRating = await Offer.findAll({
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
        isActive: true,
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
        isActive: true,
      },
      include: UserClient,
    });

    return findedByName;
  } else {
    const findedByName = await Offer.findAll({
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
        isActive: true,
      },
      include: UserClient,
    });

    return findedByName;
  }
};

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
        isActive: true,
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
          isActive: true,
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
        isActive: true,
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
        isActive: true,
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
        isActive: true,
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
        isActive: true,
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
        isActive: true,
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
        isActive: true,
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
        isActive: true,
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
        isActive: true,
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
        isActive: true,
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
        isActive: true,
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
        isActive: true,
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
        isActive: true,
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
        isActive: true,
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
        isActive: true,
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
        isActive: true,
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
        isActive: true,
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
        isActive: true,
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
        isActive: true,
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
        isActive: true,
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
        isActive: true,
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
        isActive: true,
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
        isActive: true,
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
