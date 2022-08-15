const { Offer, UserWorker } = require('../db');

<<<<<<< HEAD
export const getAllProfessions = async () => {
=======
export async function getAllProfessions() {
>>>>>>> bb6b88afcb0a9b38ecb012339db351455856ac50
    const offers: any[] = await Offer.findAll({
        attributes: ['profession']
    });
    const workers: any[] = await UserWorker.findAll({
        attributes: ['profession']
    });
    let profession: string[] = [];
<<<<<<< HEAD
    offers.forEach(e => profession = [...profession, ...e.dataValues.profession])
    workers.forEach(e => profession = [...profession, ...e.dataValues.profession])
    const professionSet = new Set(profession);
    // profession = profession.filter((e, i) => profession.indexOf(e) === i).sort()
    return [...professionSet];
};

export const getAllSkills = async () => {
=======
    offers.forEach(e => profession = [...profession, ...e.dataValues.profession]);
    workers.forEach(e => profession = [...profession, ...e.dataValues.profession]);
    const professionSet = new Set(profession);
    // profession = profession.filter((e, i) => profession.indexOf(e) === i).sort()
    return [...professionSet];
}

export async function getAllSkills() {
>>>>>>> bb6b88afcb0a9b38ecb012339db351455856ac50
    const workers: any[] = await UserWorker.findAll({
        attributes: ['skills']
    });
    let skills: string[] = [];
<<<<<<< HEAD
    workers.forEach(e => skills = [...skills, ...e.dataValues.skills])
/*     const skillsSet = new Set(skills);
    console.log(skillsSet); */
    skills = skills.filter((e, i) => skills.indexOf(e) === i).sort()
    return skills;
};
=======
    workers.forEach(e => skills = [...skills, ...e.dataValues.skills]);
    /*     const skillsSet = new Set(skills);
        console.log(skillsSet); */
    skills = skills.filter((e, i) => skills.indexOf(e) === i).sort();
    return skills;
}
>>>>>>> bb6b88afcb0a9b38ecb012339db351455856ac50
