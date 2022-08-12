import { ClientType, WorkerType } from "../types";
const { UserWorker, UserClient } = require("../db");

export async function createClient(client: ClientType,
  hashedPassword: string): Promise<string> {
  const newClient = await UserClient.create({
    // creamos el user en la db, nos traemos por parametros todo el objeto y la password se la reemplazamos por la que hasheamos.
    ...client,
    password: hashedPassword,
  });
  return newClient;
}

export async function createWorker(worker: WorkerType,
  hashedPassword: string): Promise<string> {
  const newWorker = await UserWorker.create({
    ...worker,
    password: hashedPassword,
  });
  return newWorker;
}
