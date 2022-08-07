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
exports.workerAllfiltersOn = exports.workerFilteredByRating = exports.workerFilteredByProfession = void 0;
const sequelize_1 = require("sequelize");
const { UserWorker } = require("../db");
const workerFilteredByProfession = (name, profession) => __awaiter(void 0, void 0, void 0, function* () {
    const filteredByProfession = yield UserWorker.findAll({
        where: {
            name: {
                [sequelize_1.Op.iLike]: `%${name}%`,
            },
            profession: {
                [sequelize_1.Op.contains]: [profession],
            }
        }
    });
    return filteredByProfession;
});
exports.workerFilteredByProfession = workerFilteredByProfession;
const workerFilteredByRating = (name, rating) => __awaiter(void 0, void 0, void 0, function* () {
    const filteredByRating = yield UserWorker.findAll({
        where: {
            name: {
                [sequelize_1.Op.iLike]: `%${name}%`,
            },
            rating: {
                [sequelize_1.Op.gte]: parseInt(rating)
            }
        }
    });
    return filteredByRating;
});
exports.workerFilteredByRating = workerFilteredByRating;
const workerAllfiltersOn = (name, profession, rating) => __awaiter(void 0, void 0, void 0, function* () {
    const workerAllfiltersOn = yield UserWorker.findAll({
        where: {
            name: {
                [sequelize_1.Op.iLike]: `%${name}%`,
            },
            profession: {
                [sequelize_1.Op.contains]: [profession],
            },
            rating: {
                [sequelize_1.Op.gte]: parseInt(rating)
            }
        }
    });
    return workerAllfiltersOn;
});
exports.workerAllfiltersOn = workerAllfiltersOn;
