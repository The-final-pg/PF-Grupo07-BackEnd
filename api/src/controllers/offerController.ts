import { OfferType } from "../types";
import { Op } from "sequelize";
const { Offer, Proposal, UserClient, UserWorker } = require("../db");

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

  let offer = await Offer.findByPk(id, {
    include: [
      { model: UserClient, include: Offer },
      { model: Proposal, include: UserWorker },
    ],
  });
  return offer.toJSON();
};

export const getOffersBySearch = async (q/* , multiplier: number = 0 */): Promise<OfferType[]> => {

  let offers = await Offer.findAll({
    /* limit: 8 + 5 * multiplier, */
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
  } else {
    await Offer.update(
      { state: state },
      {
        where: {
          id: id,
        },
      }
    );
    return "state updated";
  }
};
