const { Offer, UserWorker } = require('../db');

export async function getAllProfessions() {
    const offers: any[] = await Offer.findAll({
        attributes: ['profession']
    });
    const workers: any[] = await UserWorker.findAll({
        attributes: ['profession']
    });
    let profession: string[] = [];
    offers.forEach(e => profession = [...profession, ...e.dataValues.profession]);
    workers.forEach(e => profession = [...profession, ...e.dataValues.profession]);
    const professionSet = new Set(profession);
    // profession = profession.filter((e, i) => profession.indexOf(e) === i).sort()
    return [...professionSet];
}

export async function getAllSkills() {
    const workers: any[] = await UserWorker.findAll({
        attributes: ['skills']
    });
    let skills: string[] = [];
    workers.forEach(e => skills = [...skills, ...e.dataValues.skills]);
    /*     const skillsSet = new Set(skills);
        console.log(skillsSet); */
    skills = skills.filter((e, i) => skills.indexOf(e) === i).sort();
    return skills;
}
