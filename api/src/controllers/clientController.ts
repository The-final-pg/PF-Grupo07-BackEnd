<<<<<<< HEAD
import { ClientType } from "../types";
const { UserClient, Offer, Review } = require("../db");

export const getAllClients = async (): Promise<ClientType[]> => {
  let allClients = await UserClient.findAll();
  return allClients;
};

export const getClientById = async (id: String): Promise<ClientType> => {
  let client = await UserClient.findByPk(id, { include: [Offer, Review]});
  return client;
};
=======
import { ClientType, OfferType } from "../types";
const { UserClient, Offer, Review } = require("../db");

export async function getAllClients(): Promise<ClientType[]> {
  let allClients: ClientType[] = await UserClient.findAll();
  return allClients;
}

export async function getClientById(id: string): Promise<ClientType> {
  let client: ClientType = await UserClient.findByPk(id, {
    include: [Offer, Review],
  });
  return client;
}

export async function updateClientProfile(
  id: string,
  name: string,
  born_date: string,
  photo: string, 
  favorites: OfferType[]
): Promise<ClientType> {
  const data = { name, born_date, photo, favorites };
  const client = await UserClient.findByPk(id);
  if (!name || data.name === client.name) delete data.name;
  if (!born_date || data.born_date === client.born_date) delete data.born_date;
  if (!photo || data.photo === client.photo) delete data.photo;
  await client.set(data);
  await client.save();
  return client;
}
>>>>>>> bb6b88afcb0a9b38ecb012339db351455856ac50
