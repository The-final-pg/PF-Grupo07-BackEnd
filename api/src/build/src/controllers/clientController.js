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
exports.getClientById = exports.postNewUser = exports.getAllClients = void 0;
const { UserClient } = require("../db");
const getAllClients = () => __awaiter(void 0, void 0, void 0, function* () {
    let allClients = yield UserClient.findAll();
    return allClients;
});
exports.getAllClients = getAllClients;
const postNewUser = (client, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    yield UserClient.create(Object.assign(Object.assign({}, client), { password: hashedPassword }));
    return "cliente creado con exito";
});
exports.postNewUser = postNewUser;
const getClientById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let client = yield UserClient.findByPk(id);
    return client;
});
exports.getClientById = getClientById;
