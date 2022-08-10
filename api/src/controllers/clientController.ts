import { ClientType } from "../types";
const { UserClient, Offer, Review } = require("../db");

export async function getAllClients(): Promise<ClientType[]> {
  let allClients = await UserClient.findAll();
  return allClients;
}

export async function getClientById(id: String): Promise<ClientType> {
  let client = await UserClient.findByPk(id, { include: [Offer, Review] });
  return client;
}
