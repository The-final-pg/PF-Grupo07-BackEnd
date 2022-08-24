import { ClientType, WorkerType } from "../types";
const { UserClient, UserWorker } = require("../db");

export async function resetPassword(
    id: string
  ): Promise<ClientType> {
    const clientVerified = await UserClient.findByPk(id);
    await clientVerified.set({isActive : true});
    await clientVerified.save()
    return clientVerified;
  }

export async function updateWorkerStatus(
  id: string
): Promise<WorkerType> {
  const workerVerified = await UserWorker.findByPk(id);
  await workerVerified.set({isActive : true});
  await workerVerified.save()
  return workerVerified;
}