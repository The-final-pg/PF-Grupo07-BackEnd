const { Offer, UserWorker } = require('../db');

export const getAllProfessions = async () => {
    const offers: any[] = await Offer.findAll({
        attributes: ['profession']
    });
    const workers: any[] = await UserWorker.findAll({
        attributes: ['profession']
    });
    let profession: string[] = [];
    offers.forEach(e => profession = [...profession, ...e.dataValues.profession])
    workers.forEach(e => profession = [...profession, ...e.dataValues.profession])
    const professionSet = new Set(profession);
    // profession = profession.filter((e, i) => profession.indexOf(e) === i).sort()
    return professionSet;
};
