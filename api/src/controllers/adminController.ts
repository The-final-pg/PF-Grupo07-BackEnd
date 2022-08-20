import { ClientType, WorkerType } from "../types";
const { UserClient, UserWorker } = require("../db");

export async function getAllUsers (): Promise<(ClientType | WorkerType)[]> {
    let allClients: ClientType[] = await UserClient.findAll();
    let getAllWorkers: WorkerType[] = await UserWorker.findAll();
    const allUsers = [...allClients, ...getAllWorkers];
    return allUsers;
}