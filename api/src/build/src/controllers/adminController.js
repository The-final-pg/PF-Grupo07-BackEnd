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
exports.addNewSkills = exports.addNewProfessions = exports.getOfferFiltered = exports.updateUser = exports.getAllUsers = void 0;
const { UserClient, UserWorker, Offer, Proposal } = require("../db");
const id = "3748eb17-a207-5bc3-aa4f-3113a1b9409d";
function getAllUsers(isActive) {
    return __awaiter(this, void 0, void 0, function* () {
        if (isActive === "") {
            let allClients = yield UserClient.findAll();
            let getAllWorkers = yield UserWorker.findAll();
            const allUsers = [...allClients, ...getAllWorkers];
            return allUsers;
        }
        else {
            let allClients = yield UserClient.findAll({
                where: { isActive: isActive }
            });
            let getAllWorkers = yield UserWorker.findAll({
                where: { isActive: isActive }
            });
            const usersAdmin = [...allClients, ...getAllWorkers];
            return usersAdmin;
        }
    });
}
exports.getAllUsers = getAllUsers;
function updateUser(isActive, isWorker, id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (isWorker === false) {
            let client = yield UserClient.findByPk(id);
            if (isActive !== undefined) {
                yield client.set({ isActive: isActive });
                yield client.save();
                return "Se actualizo el estado isActive del Client";
            } /* else if(isAdmin !== undefined ) {
              await client.set({isAdmin})
              await client.save()
              return "Se actualizo el estado isAdmin del Client"
            } */
        }
        if (isWorker === true) {
            let worker = yield UserWorker.findByPk(id);
            if (isActive !== undefined) {
                yield worker.set({ isActive: isActive });
                yield worker.save();
                return "Se actualizo el estado isActive del Worker";
            } /* else if(isAdmin !== undefined ) {
              await worker.set({isAdmin})
              await worker.save()
              return "Se actualizo el estado isAdmin del Worker"
            } */
        }
    });
}
exports.updateUser = updateUser;
function getOfferFiltered(isActive) {
    return __awaiter(this, void 0, void 0, function* () {
        if (isActive === "true") {
            const allOffers = yield Offer.findAll({
                where: {
                    isActive: true,
                },
                include: [UserClient, { model: Proposal, include: UserWorker }],
            });
            return allOffers;
        }
        else if (isActive === "false") {
            const allOffers = yield Offer.findAll({
                where: {
                    isActive: false,
                },
                include: [UserClient, { model: Proposal, include: UserWorker }],
            });
            return allOffers;
        }
        else {
            const allOffers = yield Offer.findAll({
                include: [UserClient, { model: Proposal, include: UserWorker }],
            });
            return allOffers;
        }
    });
}
exports.getOfferFiltered = getOfferFiltered;
function addNewProfessions(professions) {
    return __awaiter(this, void 0, void 0, function* () {
        const workerData = yield UserWorker.findByPk(id, {
            attributes: ["profession"],
        });
        const totalProfessions = workerData.toJSON();
        const totalNewProfessions = totalProfessions.profession;
        professions.forEach((e) => totalNewProfessions.includes(e) ? null : totalNewProfessions.push(e));
        yield UserWorker.update({
            profession: totalNewProfessions,
        }, {
            where: {
                id,
            },
        });
        return totalNewProfessions;
    });
}
exports.addNewProfessions = addNewProfessions;
function addNewSkills(skills) {
    return __awaiter(this, void 0, void 0, function* () {
        const workerData = yield UserWorker.findByPk(id, {
            attributes: ["skills"],
        });
        const totalSkills = workerData.toJSON();
        const totalNewSkills = totalSkills.skills;
        skills.forEach((e) => totalNewSkills.includes(e) ? null : totalNewSkills.push(e));
        yield UserWorker.update({
            skills: totalNewSkills,
        }, {
            where: {
                id,
            },
        });
        return totalNewSkills;
    });
}
exports.addNewSkills = addNewSkills;
