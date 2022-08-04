import * as types from "../types";
const {UserWorker, UserClient} = require("../db");

export const createClient = async (client: types.client, hashedPassword: string): Promise<string> => {
    await UserClient.create({
        ...client,
        password: hashedPassword
    })
    return "Cliente creado con exito"
}

export const createWorker = async (worker: types.worker, hashedPassword: string): Promise<string> => {
    await UserWorker.create({
      ...worker,
      password: hashedPassword
    })
    return "Trabajador creado con exito"
  }