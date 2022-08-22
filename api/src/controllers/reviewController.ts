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
  const client = await UserClient.findByPk(id, { include: Review });
  //busca la Offer por la id recibida
  const offer = await Offer.findByPk(idOffer);
  //calcula y guarda el nuevo rating primedio del cliente
  const rating: number = client.reviews.length
    ? (client.reviews.reduce(
        (r: number, e: { dataValues: { valoration: number } }) =>
          r + e.dataValues.valoration,
        0
      ) +
        review.valoration) /
      (client.reviews.length + 1)
    : parseInt(review.valoration);
  await UserClient.update(
    { rating: Number(parseInt(rating.toFixed(2))) },
    {
      where: {
        id: id,
      },
    }
  );
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
  const worker = await UserWorker.findByPk(id, { include: Review });
  const offer = await Offer.findByPk(idOffer);
  const rating: number = worker.reviews.length
    ? (worker.reviews.reduce(
        (r: number, e: { dataValues: { valoration: number } }) =>
          r + e.dataValues.valoration,
        0
      ) +
        review.valoration) /
      (worker.reviews.length + 1)
    : parseInt(review.valoration);
  await UserWorker.update(
    { rating: Number(parseInt(rating.toFixed(2))) },
    {
      where: {
        id: id,
      },
    }
  );
  await worker.addReview(newReview);
  await offer.addReview(newReview);
  return "Valoración creada con éxito";
};
