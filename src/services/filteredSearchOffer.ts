import { OfferType } from "../types";
import { Op } from "sequelize";

const { Offer, UserClient } = require("../db");

export const offerFilteredByProfession = async (
  input,
  profession,
/*   multiplier: number = 0 */
): Promise<OfferType[]> => {
  if (!input && profession){
    console.log('Estoy aca 1')
    const filteredByProfession = await Offer.findAll({
/*       limit: 8 + 5 * multiplier , */
      where: {
        profession: {
          [Op.contains]: [profession],
        },
      },
      include: UserClient,
    });
    return filteredByProfession;
  }
  else {

    const filteredByProfession = await Offer.findAll({
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
      include: UserClient,
    });
    return filteredByProfession;
  }
};

export const offerFilteredByRating = async (
  input,
  rating,
/*   multiplier: number = 0 */
): Promise<OfferType[]> => {
  if (!input && rating){
    const filteredByRating = await Offer.findAll({
/*       limit: 8 + 5 * multiplier, */
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
  else {
    const filteredByRating = await Offer.findAll({
 /*      limit: 8 + 5 * multiplier, */
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
  
    return findedByName;
  }
};

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
