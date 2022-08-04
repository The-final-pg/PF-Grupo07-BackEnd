import { ClientType, WorkerType} from "../types";
const {UserWorker, UserClient} = require("../db");

export const createClient = async (client: ClientType, hashedPassword: string): Promise<string> => {
    await UserClient.create({
        ...client,
        password: hashedPassword
    })
    return "Cliente creado con exito"
}

export const createWorker = async (worker: WorkerType, hashedPassword: string): Promise<string> => {
    await UserWorker.create({
      ...worker,
      password: hashedPassword
    })
    return "Trabajador creado con exito"
  }
