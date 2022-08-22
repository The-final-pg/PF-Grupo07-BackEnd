"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllSkills = exports.getAllProfessions = void 0;
const { UserWorker } = require('../db');
const id = "3748eb17-a207-5bc3-aa4f-3113a1b9409d";
function getAllProfessions() {
    return __awaiter(this, void 0, void 0, function* () {
        const workerData = yield UserWorker.findByPk(id, { atributtes: ["profession"] });
        const professions = workerData.toJSON();
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
    });
}
exports.getAllProfessions = getAllProfessions;
;
function getAllSkills() {
    return __awaiter(this, void 0, void 0, function* () {
        const workerData = yield UserWorker.findByPk(id, { atributtes: ["skills"] });
        const skills = workerData.toJSON();
        return [...skills.skills];
        /*     const workers: any[] = await UserWorker.findAll({
                attributes: ['skills']
            });
            let skills: string[] = [];
            workers.forEach(e => skills = [...skills, ...e.dataValues.skills]);
            skills = skills.filter((e, i) => skills.indexOf(e) === i).sort();
            return skills; */
    });
}
exports.getAllSkills = getAllSkills;
;
