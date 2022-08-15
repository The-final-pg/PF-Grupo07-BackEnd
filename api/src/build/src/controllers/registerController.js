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
exports.createWorker = exports.createClient = void 0;
const { UserWorker, UserClient } = require("../db");
<<<<<<< HEAD
const createClient = (client, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    yield UserClient.create(Object.assign(Object.assign({}, client), { password: hashedPassword }));
    return "Cliente creado con exito";
});
exports.createClient = createClient;
const createWorker = (worker, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    yield UserWorker.create(Object.assign(Object.assign({}, worker), { password: hashedPassword }));
    return "Trabajador creado con exito";
});
=======
function createClient(client, hashedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const newClient = yield UserClient.create(Object.assign(Object.assign({}, client), { password: hashedPassword }));
        return newClient;
    });
}
exports.createClient = createClient;
function createWorker(worker, hashedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const newWorker = yield UserWorker.create(Object.assign(Object.assign({}, worker), { password: hashedPassword }));
        return newWorker;
    });
}
>>>>>>> bb6b88afcb0a9b38ecb012339db351455856ac50
exports.createWorker = createWorker;
