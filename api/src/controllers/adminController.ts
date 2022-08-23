import { ClientType, OfferType, WorkerType } from "../types";
const { UserClient, UserWorker, Offer, Proposal } = require("../db");

const id: string = "3748eb17-a207-5bc3-aa4f-3113a1b9409d";

export async function getAllUsers(isActive: string): Promise<(ClientType | WorkerType)[]> {
  if(isActive === "") {
    let allClients: ClientType[] = await UserClient.findAll();
    let getAllWorkers: WorkerType[] = await UserWorker.findAll();
    const allUsers : (ClientType | WorkerType)[] = [...allClients, ...getAllWorkers];
    return allUsers;
  } else {
    let allClients: ClientType[] = await UserClient.findAll({
      where: {isActive: isActive}
    });
    let getAllWorkers: WorkerType[] = await UserWorker.findAll({
      where: {isActive: isActive}
    });
    const usersAdmin : (ClientType | WorkerType)[] = [...allClients, ...getAllWorkers];
    return usersAdmin;
  }
}

export async function updateUser(isActive: string, isWorker: string, id: string, /* isAdmin: string */) {
  if(isWorker === "false") {
    let client = await UserClient.findByPk(id)
    if(isActive !== undefined) {
      await client.set({isActive})
      await client.save()
      return "Se actualizo el estado isActive del Client"
    } /* else if(isAdmin !== undefined ) {
      await client.set({isAdmin})
      await client.save()
      return "Se actualizo el estado isAdmin del Client"
    } */
  } 
  
  if(isWorker === "true") {
    let worker = await UserWorker.findByPk(id)
    if(isActive !== undefined) {
      await worker.set({isActive})
      await worker.save()
      return "Se actualizo el estado isActive del Worker"
    } /* else if(isAdmin !== undefined ) {
      await worker.set({isAdmin})
      await worker.save()
      return "Se actualizo el estado isAdmin del Worker"
    } */
  }
}

export async function getOfferFiltered(
  isActive: string,
): Promise<OfferType[]> {
  if (isActive === "true") {
    const allOffers: OfferType[] = await Offer.findAll({
      where: {
        isActive: true,
      },
      include: [UserClient, Proposal],
    });
    return allOffers;
  } else if (isActive === "false") {
    const allOffers: OfferType[] = await Offer.findAll({
      where: {
        isActive: false,
      },
      include: [UserClient, Proposal],
    });
    return allOffers;
  } else {
    const allOffers: OfferType[] = await Offer.findAll({
      include: [UserClient, Proposal],
    });
    return allOffers;
  }
}

export async function addNewProfessions(
  professions: string[]
): Promise<string[]> {
  const workerData: any = await UserWorker.findByPk(id, {
    attributes: ["profession"],
  });
  const totalProfessions: any = workerData.toJSON();
  const totalNewProfessions: string[] = totalProfessions.profession;
  professions.forEach((e: string) =>
    totalNewProfessions.includes(e) ? null : totalNewProfessions.push(e)
  );
  await UserWorker.update(
    {
      profession: totalNewProfessions,
    },
    {
      where: {
        id,
      },
    }
  );
  return totalNewProfessions;
}

export async function addNewSkills(skills: string[]): Promise<string[]> {
  const workerData: any = await UserWorker.findByPk(id, {
    attributes: ["skills"],
  });
  const totalSkills: any = workerData.toJSON();
  const totalNewSkills: string[] = totalSkills.skills;
  skills.forEach((e: string) =>
    totalNewSkills.includes(e) ? null : totalNewSkills.push(e)
  );
  await UserWorker.update(
    {
      skills: totalNewSkills,
    },
    {
      where: {
        id,
      },
    }
  );
  return totalNewSkills;
}
