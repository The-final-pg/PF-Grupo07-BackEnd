const { UserWorker } = require('../db');

const id: string = "3748eb17-a207-5bc3-aa4f-3113a1b9409d";

export async function getAllProfessions(): Promise<string[]> {
    const workerData: any = await UserWorker.findByPk(id, {atributtes: ["profession"]});
    const professions: any = workerData.toJSON();
    return [...professions.profession];

/*     const offers: any[] = await Offer.findAll({
        attributes: ['profession']
    });
    const workers: any[] = await UserWorker.findAll({
        attributes: ['profession']
    });
    let profession: string[] = [];
    offers.forEach(e => profession = [...profession, ...e.dataValues.profession]);
    workers.forEach(e => profession = [...profession, ...e.dataValues.profession]);
    const professionSet = new Set(profession);
    return [...professionSet]; */
};

export async function getAllSkills(): Promise<string[]> {
    const workerData: any = await UserWorker.findByPk(id, {atributtes: ["skills"]});
    const skills: any = workerData.toJSON();
    return [...skills.skills];

/*     const workers: any[] = await UserWorker.findAll({
        attributes: ['skills']
    });
    let skills: string[] = [];
    workers.forEach(e => skills = [...skills, ...e.dataValues.skills]);
    skills = skills.filter((e, i) => skills.indexOf(e) === i).sort();
    return skills; */
};
