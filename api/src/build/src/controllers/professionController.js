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
const { Offer, UserWorker } = require('../db');
function getAllProfessions() {
    return __awaiter(this, void 0, void 0, function* () {
        const offers = yield Offer.findAll({
            attributes: ['profession']
        });
        const workers = yield UserWorker.findAll({
            attributes: ['profession']
        });
        let profession = [];
        offers.forEach(e => profession = [...profession, ...e.dataValues.profession]);
        workers.forEach(e => profession = [...profession, ...e.dataValues.profession]);
        const professionSet = new Set(profession);
        // profession = profession.filter((e, i) => profession.indexOf(e) === i).sort()
        return [...professionSet];
    });
}
exports.getAllProfessions = getAllProfessions;
function getAllSkills() {
    return __awaiter(this, void 0, void 0, function* () {
        const workers = yield UserWorker.findAll({
            attributes: ['skills']
        });
        let skills = [];
        workers.forEach(e => skills = [...skills, ...e.dataValues.skills]);
        /*     const skillsSet = new Set(skills);
            console.log(skillsSet); */
        skills = skills.filter((e, i) => skills.indexOf(e) === i).sort();
        return skills;
    });
}
exports.getAllSkills = getAllSkills;
