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
function createClient(client, hashedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        yield UserClient.create(Object.assign(Object.assign({}, client), { password: hashedPassword }));
        return "Cliente creado con exito";
    });
}
exports.createClient = createClient;
function createWorker(worker, hashedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        yield UserWorker.create(Object.assign(Object.assign({}, worker), { password: hashedPassword }));
        return "Trabajador creado con exito";
    });
}
exports.createWorker = createWorker;
