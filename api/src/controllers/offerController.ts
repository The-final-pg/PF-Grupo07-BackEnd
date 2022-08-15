import { OfferType } from "../types";
import { Op } from "sequelize";
const { Offer, Proposal, UserClient, UserWorker } = require("../db");

<<<<<<< HEAD
export const getAllOffers = async (/* multiplier: number = 0 */): Promise<OfferType[]> => {
  let allOffers = await Offer.findAll({ 
 /*    limit: 8 + 5 * multiplier, */
    include: UserClient });
  return allOffers;
};

export const postOffer = async (offer: OfferType): Promise<string> => {
  await Offer.create(offer);
  return "Propuesta creado con exito";
};

export const getOfferById = async (id: String): Promise<OfferType> => {
=======
export async function getAllOffers(): Promise<OfferType[]> {
  let allOffers = await Offer.findAll({
    include: UserClient
  });
  return allOffers;
}

export async function postOffer(offer: OfferType): Promise<string> {
  await Offer.create(offer);
  return "Propuesta creado con exito";
}

export async function getOfferById(id: String): Promise<OfferType> {
>>>>>>> bb6b88afcb0a9b38ecb012339db351455856ac50

  let offer = await Offer.findByPk(id, {
    include: [
      { model: UserClient, include: Offer },
      { model: Proposal, include: UserWorker },
    ],
  });
  return offer.toJSON();
<<<<<<< HEAD
};

export const getOffersBySearch = async (q/* , multiplier: number = 0 */): Promise<OfferType[]> => {

  let offers = await Offer.findAll({
    /* limit: 8 + 5 * multiplier, */
=======
}

export async function getOffersBySearch(q): Promise<OfferType[]> {

  let offers = await Offer.findAll({
>>>>>>> bb6b88afcb0a9b38ecb012339db351455856ac50
    where: {
      [Op.or]: [
        {
          title: {
            [Op.iLike]: `%${q}%`,
          },
        },
        {
          offer_description: {
            [Op.iLike]: `%${q}%`,
          },
        },
      ],
    },
<<<<<<< HEAD
    include:UserClient
  });
  return offers;
};

export const putOfferState = async (
  id: String,
  state: String
): Promise<string> => {
  const offerState: OfferType = await Offer.findAll({
    where: {
      id: id,
    },
  });
  if (offerState.state === "cancelled") {
    return "Flaco la hubieras pensado antes";
=======
    include: UserClient
  });
  return offers;
}

export async function putOfferState(id: String,
  state: String): Promise<string> {
  const offerState: OfferType = await Offer.findOne({
    where: {
      idOffer: id,
    },
  });
  if (!offerState) {
    throw new Error("`La oferta ${id} no existe en la base de datos`")
  }

  if (offerState.state === "cancelled") {
    return "La oferta fue cancelada y no puede cambiar de estado";
>>>>>>> bb6b88afcb0a9b38ecb012339db351455856ac50
  } else {
    await Offer.update(
      { state: state },
      {
        where: {
<<<<<<< HEAD
          id: id,
=======
          idOffer: id,
>>>>>>> bb6b88afcb0a9b38ecb012339db351455856ac50
        },
      }
    );
    return "state updated";
  }
<<<<<<< HEAD
=======
}

export async function putOfferIsActive(id: String,
  isActive: Boolean): Promise<string> {
  const offerState: OfferType = await Offer.findOne({
    where: {
      idOffer: id,
    },
  });
  if (!offerState) {
    throw new Error(`La oferta ${id} no existe en la base de datos`)
  } else {
    await Offer.update(
      { isActive: isActive },
      {
        where: {
          idOffer: id,
        },
      }
    );
    return "isActive updated";
  }
>>>>>>> bb6b88afcb0a9b38ecb012339db351455856ac50
};
