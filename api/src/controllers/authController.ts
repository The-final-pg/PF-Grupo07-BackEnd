import { ClientType, WorkerType } from "../types";
const { UserWorker, UserClient } = require("../db");

export async function createGoogleClient(client: ClientType): Promise<string> {
  const newClient = await UserClient.create({
    // creamos el user en la db, nos traemos por parametros todo el objeto y la password se la reemplazamos por la que hasheamos.
    ...client
  });
  return newClient;
}

export async function createGoogleWorker(worker: WorkerType): Promise<string> {
  const newWorker = await UserWorker.create({
    ...worker
  });
  return newWorker;
}
