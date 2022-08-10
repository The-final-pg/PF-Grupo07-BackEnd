import { ReviewType } from "../types";
const { Review, UserClient, Offer, UserWorker } = require("../db");

export const postReview = async (
  idClient: string,
  idWorker: string,
  idOffer: string,
  review: ReviewType
): Promise<string> => {
  const newReview = await Review.create(review);
    const client = await UserClient.findByPk(idClient);
    const worker = await UserWorker.findByPk(idWorker);
    const offer = await Offer.findByPk(idOffer);
    await client.addReview(newReview);
    await worker.addReview(newReview);
    await offer.addReview(newReview);
  return "Valoración creada con éxito";
};
