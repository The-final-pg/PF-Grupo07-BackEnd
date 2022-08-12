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
exports.updateClientProfile = exports.getClientById = exports.getAllClients = void 0;
const { UserClient, Offer, Review } = require("../db");
function getAllClients() {
    return __awaiter(this, void 0, void 0, function* () {
        let allClients = yield UserClient.findAll();
        return allClients;
    });
}
exports.getAllClients = getAllClients;
function getClientById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let client = yield UserClient.findByPk(id, {
            include: [Offer, Review],
        });
        return client;
    });
}
exports.getClientById = getClientById;
function updateClientProfile(id, name, born_date, photo, favorites) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = { name, born_date, photo, favorites };
        const client = yield UserClient.findByPk(id);
        if (!name || data.name === client.name)
            delete data.name;
        if (!born_date || data.born_date === client.born_date)
            delete data.born_date;
        if (!photo || data.photo === client.photo)
            delete data.photo;
        yield client.set(data);
        yield client.save();
        return client;
    });
}
exports.updateClientProfile = updateClientProfile;
