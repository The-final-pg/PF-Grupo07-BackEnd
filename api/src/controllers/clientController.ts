import * as types from "../types"
const {UserClient} = require("../db")

export const getAllClients = async (): Promise<types.client[]> => {
    let allClients = await UserClient.findAll();
    return allClients
}

export const postNewUser = async (client: types.client): Promise<string> => {
    await UserClient.create(client)
    return "cliente creado con exito"
}

export const getClientById = async (id:String): Promise<types.client> =>{
    let client = await UserClient.findByPk(id);
    return client;
}