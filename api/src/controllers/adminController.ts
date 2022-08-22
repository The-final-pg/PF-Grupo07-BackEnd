import { ClientType, OfferType, WorkerType } from "../types";
const { UserClient, UserWorker, Offer } = require("../db");

const id: string = "3748eb17-a207-5bc3-aa4f-3113a1b9409d";

export async function getAllUsers(): Promise<(ClientType | WorkerType)[]> {
  let allClients: ClientType[] = await UserClient.findAll();
  let getAllWorkers: WorkerType[] = await UserWorker.findAll();
  const allUsers = [...allClients, ...getAllWorkers];
  return allUsers;
}

export async function getOfferFiltered(
  isActive: string,
): Promise<OfferType[]> {
  if (isActive === "true") {
    const allOffers: OfferType[] = await Offer.findAll({
      where: {
        isActive: true,
      },
      include: UserClient,
    });
    return allOffers;
  } else if (isActive === "false") {
    const allOffers: OfferType[] = await Offer.findAll({
      where: {
        isActive: false,
      },
      include: UserClient,
    });
    return allOffers;
  } else {
    const allOffers: OfferType[] = await Offer.findAll();
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
