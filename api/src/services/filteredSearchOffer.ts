import { OfferType } from "../types";
import { Op } from "sequelize";

const { Offer, UserClient } = require("../db");

export const offerFilteredByProfession = async (
  input,
  profession
): Promise<OfferType[]> => {
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
    },
    include: UserClient,
  });
  return filteredByProfession;
};

export const offerFilteredByRating = async (
  input,
  rating
): Promise<OfferType[]> => {
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
};

export const offerFilteredByRemuneration = async (
  input,
  remMax,
  remMin
): Promise<OfferType[]> => {
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
    },
    include: UserClient,
  });
  const filteredByRemuneration = findedByName.filter(
    (offer) =>
      offer.dataValues.remuneration[0] >= remMin &&
      offer.dataValues.remuneration[1] <= remMax
  );
  return filteredByRemuneration;
};

export const offerAllFiltersOn = async (
  input,
  profession,
  rating,
  remMax,
  remMin
): Promise<OfferType[]> => {
  console.log(input,
    profession,
    rating,
    remMax,
    remMin)
  if (input && profession && rating && remMax && remMin) {
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
    console.log('allFiltersOn ',allFiltersOn)
    const filteredByRemuneration = allFiltersOn.filter(
      (offer) =>
        offer.dataValues.remuneration[0] >= remMin &&
        offer.dataValues.remuneration[1] <= remMax
    );
    return filteredByRemuneration;
      }
  if (input && !profession && rating && remMax && remMin) {
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
    console.log("profession ", allFiltersOn)
    const filteredByRemuneration = allFiltersOn.filter(
      (offer) =>
        offer.dataValues.remuneration[0] >= remMin &&
        offer.dataValues.remuneration[1] <= remMax
    );
    return filteredByRemuneration;
  }
  if (input && profession && !rating && remMax && remMin) {
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
      },
    });
    console.log("rating ",allFiltersOn)
    const filteredByRemuneration = allFiltersOn.filter(
      (offer) =>
        offer.dataValues.remuneration[0] >= remMin &&
        offer.dataValues.remuneration[1] <= remMax
    );
    return filteredByRemuneration;
  }
  if (input && profession && rating && !remMax && !remMin) {
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
    console.log('remuneration ',allFiltersOn)
    return allFiltersOn;
  }
};
