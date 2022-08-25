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
exports.addBankDataWorker = exports.putWorkerPremium = exports.updateWorkerProfile = exports.getWorkerById = exports.getWorkerByName = exports.getAllWorkers = void 0;
const sequelize_1 = require("sequelize");
const { UserWorker, Review, Proposal, Portfolio } = require("../db");
const CompareArraysEquality_1 = require("../services/CompareArraysEquality");
function getAllWorkers() {
    return __awaiter(this, void 0, void 0, function* () {
        const allWorkers = yield UserWorker.findAll({
            where: {
                isActive: true,
            }
        });
        return allWorkers;
    });
}
exports.getAllWorkers = getAllWorkers;
function getWorkerByName(name) {
    return __awaiter(this, void 0, void 0, function* () {
        const worker = yield UserWorker.findAll({
            where: {
                [sequelize_1.Op.or]: [
                    {
                        name: {
                            [sequelize_1.Op.iLike]: `%${name}%`,
                        },
                    },
                    {
                        lastName: {
                            [sequelize_1.Op.iLike]: `%${name}%`,
                        },
                    },
                ],
                isActive: true,
            },
        });
        return worker;
    });
}
exports.getWorkerByName = getWorkerByName;
function getWorkerById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const workerById = yield UserWorker.findByPk(id, {
            include: [Review, Proposal, Portfolio],
        });
        return workerById;
    });
}
exports.getWorkerById = getWorkerById;
function updateWorkerProfile(id, name, lastName, born_date, photo, profession, skills, favorites, description) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = {
            name,
            lastName,
            born_date,
            photo,
            profession,
            skills,
            favorites,
            description,
        };
        const worker = yield UserWorker.findByPk(id);
        if (!name || data.name === worker.name)
            delete data.name;
        if (!lastName || data.lastName === worker.lastName)
            delete data.lastName;
        if (!born_date || data.born_date === worker.born_date)
            delete data.born_date;
        if (!photo || data.photo === worker.photo)
            delete data.photo;
        if (!profession || (0, CompareArraysEquality_1.compareArrays)(data.profession, worker.profession))
            delete data.profession;
        if (!skills || (0, CompareArraysEquality_1.compareArrays)(data.skills, worker.skills))
            delete data.skills;
        if (!favorites)
            delete data.favorites;
        if (!description)
            delete data.description;
        yield worker.set(data);
        yield worker.save();
        return worker;
    });
}
exports.updateWorkerProfile = updateWorkerProfile;
;
function putWorkerPremium(id, premium) {
    return __awaiter(this, void 0, void 0, function* () {
        const worker = yield UserWorker.findByPk(id);
        yield worker.set({ premium: premium });
        yield worker.save();
        return "Ya tienes cuenta premium!";
    });
}
exports.putWorkerPremium = putWorkerPremium;
function addBankDataWorker(id, bank_data) {
    return __awaiter(this, void 0, void 0, function* () {
        const worker = yield UserWorker.findByPk(id);
        console.log(worker);
        console.log("id", id);
        console.log("bank_data", bank_data);
        yield worker.set({ bank_data: bank_data });
        yield worker.save();
        return "Datos bancarios cargados exitosamente";
    });
}
exports.addBankDataWorker = addBankDataWorker;
