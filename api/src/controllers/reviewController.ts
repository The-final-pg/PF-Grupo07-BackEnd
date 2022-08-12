import { ReviewType } from "../types";
const { Review, UserClient, Offer, UserWorker } = require("../db");

//la funcion ReviewClient toma el valor de id de ofer y client y la review
export const postReviewClient = async (
  id: string,
  idOffer: string,
  review: ReviewType
): Promise<string> => {
  //crea una nueva review con el objeto que llega por parametros
  const newReview = await Review.create(review);
  //busca al cliente por la ID recibida
    const client = await UserClient.findByPk(id);
  //busca la Offer por la id recibida
    const offer = await Offer.findByPk(idOffer)
    //relaciona al client y la offer con la nueva review
    await client.addReview(newReview);
    await offer.addReview(newReview);
  return "Valoración creada con éxito";
};

export const postReviewWorker = async (
  id: string,
  idOffer: string,
  review: ReviewType
): Promise<string> => {
  const newReview = await Review.create(review);
    const worker = await UserWorker.findByPk(id);
    const offer = await Offer.findByPk(idOffer);
    await worker.addReview(newReview);
    await offer.addReview(newReview);
  return "Valoración creada con éxito";
};