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
exports.cleanDataBase = exports.scheduledFunction = exports.time = void 0;
const { Offer } = require("../db");
const sequelize_1 = require("sequelize");
function time() {
    const currentTime = new Date();
    let scheduledTime = new Date();
    scheduledTime.setHours(6);
    scheduledTime.setMinutes(33);
    scheduledTime.setSeconds(0);
    return scheduledTime.getTime() - currentTime.getTime();
}
exports.time = time;
function scheduledFunction() {
    return __awaiter(this, void 0, void 0, function* () {
        yield Offer.update({ isActive: false }, { where: {
                [sequelize_1.Op.and]: [
                    { isActive: true },
                    { state: "active" },
                    {
                        post_date: {
                            [sequelize_1.Op.lte]: new Date(new Date().getTime() - 240 * 60 * 60 * 1000),
                        },
                    },
                ],
            } });
    });
}
exports.scheduledFunction = scheduledFunction;
function cleanDataBase() {
    setTimeout(scheduledFunction, time());
}
exports.cleanDataBase = cleanDataBase;
