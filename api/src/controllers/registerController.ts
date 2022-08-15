import { ClientType, WorkerType } from "../types";
const { UserWorker, UserClient } = require("../db");

<<<<<<< HEAD
export const createClient = async (
  client: ClientType,
  hashedPassword: string
): Promise<string> => {
  await UserClient.create({
=======
export async function createClient(client: ClientType,
  hashedPassword: string): Promise<string> {
  const newClient = await UserClient.create({
>>>>>>> bb6b88afcb0a9b38ecb012339db351455856ac50
    // creamos el user en la db, nos traemos por parametros todo el objeto y la password se la reemplazamos por la que hasheamos.
    ...client,
    password: hashedPassword,
  });
<<<<<<< HEAD
  return "Cliente creado con exito";
};

export const createWorker = async (
  worker: WorkerType,
  hashedPassword: string
): Promise<string> => {
  await UserWorker.create({
    ...worker,
    password: hashedPassword,
  });
  return "Trabajador creado con exito";
};
=======
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
>>>>>>> bb6b88afcb0a9b38ecb012339db351455856ac50
