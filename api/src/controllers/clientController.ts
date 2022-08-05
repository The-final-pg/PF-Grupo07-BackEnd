import { ClientType } from "../types";
const { UserClient } = require("../db");

export const getAllClients = async (): Promise<ClientType[]> => {
  let allClients = await UserClient.findAll();
  return allClients;
};

export const getClientById = async (id: String): Promise<ClientType> => {
  let client = await UserClient.findByPk(id);
  return client;
};
