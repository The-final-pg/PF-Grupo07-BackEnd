import { OfferType } from "../types";
import { Op } from "sequelize";
const { Offer, Proposal, UserClient, UserWorker } = require("../db");

export async function getAllOffers(): Promise<OfferType[]> {
  let allOffers = await Offer.findAll({
    where: {
      isActive: true,
    },
    include: UserClient
  });
  return allOffers;
}

export async function postOffer(offer: OfferType): Promise<string> {
  await Offer.create(offer);
  return "Propuesta creado con exito";
}

export async function getOfferById(id: String): Promise<OfferType> {

  let offer = await Offer.findByPk(id, {
    include: [
      { model: UserClient, include: Offer },
      { model: Proposal, include: UserWorker },
    ],
  });
  return offer.toJSON();
}

export async function getOffersBySearch(q: string): Promise<OfferType[]> {

  let offers = await Offer.findAll({
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
      isActive: true,
    },
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
  } else {
    await Offer.update(
      { state: state },
      {
        where: {
          idOffer: id,
        },
      }
    );
    return "state updated";
  }
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
};
