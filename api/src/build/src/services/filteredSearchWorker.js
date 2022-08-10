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
function workerFilteredByProfession(name, profession) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!name && profession) {
            const filteredByProfession = yield UserWorker.findAll({
                where: {
                    profession: {
                        [sequelize_1.Op.contains]: [profession],
                    },
                },
            });
            return filteredByProfession;
        }
        else {
            const filteredByProfession = yield UserWorker.findAll({
                where: {
                    name: {
                        [sequelize_1.Op.iLike]: `%${name}%`,
                    },
                    profession: {
                        [sequelize_1.Op.contains]: [profession],
                    },
                },
            });
            return filteredByProfession;
        }
    });
}
exports.workerFilteredByProfession = workerFilteredByProfession;
function workerFilteredByRating(name, rating) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!name && rating) {
            const filteredByRating = yield UserWorker.findAll({
                where: {
                    rating: {
                        [sequelize_1.Op.gte]: parseInt(rating),
                    },
                },
            });
            return filteredByRating;
        }
        else {
            const filteredByRating = yield UserWorker.findAll({
                where: {
                    name: {
                        [sequelize_1.Op.iLike]: `%${name}%`,
                    },
                    rating: {
                        [sequelize_1.Op.gte]: parseInt(rating),
                    },
                },
            });
            return filteredByRating;
        }
    });
}
exports.workerFilteredByRating = workerFilteredByRating;
function workerAllfiltersOn(name, profession, rating) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!name && profession && rating) {
            const workerAllfiltersOn = yield UserWorker.findAll({
                where: {
                    profession: {
                        [sequelize_1.Op.contains]: [profession],
                    },
                    rating: {
                        [sequelize_1.Op.gte]: parseInt(rating),
                    },
                },
            });
            return workerAllfiltersOn;
        }
        else {
            const workerAllfiltersOn = yield UserWorker.findAll({
                where: {
                    name: {
                        [sequelize_1.Op.iLike]: `%${name}%`,
                    },
                    profession: {
                        [sequelize_1.Op.contains]: [profession],
                    },
                    rating: {
                        [sequelize_1.Op.gte]: parseInt(rating),
                    },
                },
            });
            return workerAllfiltersOn;
        }
    });
}
exports.workerAllfiltersOn = workerAllfiltersOn;
