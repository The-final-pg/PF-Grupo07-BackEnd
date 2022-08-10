import { OfferType } from "../types";
import { Op } from "sequelize";

const { Offer, UserClient } = require("../db");

export async function offerFilteredByProfession(
  input,
  profession,
): Promise<OfferType[]> {
  if (!input && profession) {
    console.log("Estoy aca 1");
    const filteredByProfession = await Offer.findAll({
      where: {
        profession: {
          [Op.contains]: [profession],
        },
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
      },
      include: UserClient,
    });
    return filteredByProfession;
  }
}

export async function offerFilteredByRating(
  input,
  rating,
): Promise<OfferType[]> {
  if (!input && rating) {
    const filteredByRating = await Offer.findAll({
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
  input,
  remMax,
  remMin,
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
}

export async function offerAllFiltersOn(
  input,
  profession,
  rating,
  remMax,
  remMin,
): Promise<OfferType[]> {
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
