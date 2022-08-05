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
exports.getAllProfessions = void 0;
const { Offer, UserWorker } = require('../db');
const getAllProfessions = () => __awaiter(void 0, void 0, void 0, function* () {
    const offers = yield Offer.findAll({
        attributes: ['profession']
    });
    const workers = yield UserWorker.findAll({
        attributes: ['profession']
    });
    let profession = [];
    offers.forEach(e => profession = [...profession, ...e.dataValues.profession]);
    workers.forEach(e => profession = [...profession, ...e.dataValues.profession]);
    profession = profession.filter((e, i) => profession.indexOf(e) === i).sort();
    return profession;
});
exports.getAllProfessions = getAllProfessions;
