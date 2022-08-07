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
exports.getWorkerById = exports.getWorkerByName = exports.getAllWorkers = void 0;
const sequelize_1 = require("sequelize");
const { UserWorker, Review, Proposal, Portfolio } = require("../db");
const getAllWorkers = (multiplier = 0) => __awaiter(void 0, void 0, void 0, function* () {
    const allWorkers = yield UserWorker.findAll({
        limit: 8 + 5 * multiplier,
    });
    return allWorkers;
});
exports.getAllWorkers = getAllWorkers;
const getWorkerByName = (name, multiplier = 0) => __awaiter(void 0, void 0, void 0, function* () {
    const worker = yield UserWorker.findAll({
        limit: 8 + 5 * multiplier,
        where: {
            name: {
                [sequelize_1.Op.iLike]: `%${name}%`,
            },
        },
    });
    return worker;
});
exports.getWorkerByName = getWorkerByName;
const getWorkerById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const workerById = yield UserWorker.findByPk(id, {
        include: [Review, Proposal, Portfolio]
    });
    return workerById;
});
exports.getWorkerById = getWorkerById;
