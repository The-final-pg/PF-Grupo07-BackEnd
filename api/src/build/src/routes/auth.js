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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth = express_1.default.Router();
const bcrypt = require("bcrypt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const { SECRET_KEY } = process.env;
const { UserWorker, UserClient } = require("../db"); /*
import { createGoogleClient, createGoogleWorker } from "../controllers/authController";
import { ClientType } from "../types"; */
auth.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const googleUser = req.body;
    try {
        console.log(googleUser);
        const clientFound = yield UserClient.findOne({ where: { user_mail: googleUser === null || googleUser === void 0 ? void 0 : googleUser.user_mail } });
        const workerFound = yield UserWorker.findOne({ where: { user_mail: googleUser === null || googleUser === void 0 ? void 0 : googleUser.user_mail } });
        console.log("clien", clientFound);
        console.log("worker", workerFound);
        if (clientFound) {
            return res.send(jsonwebtoken_1.default.sign({
                id: clientFound.id,
                user_mail: clientFound.user_mail,
                isAdmin: clientFound.isAdmin,
                isWorker: clientFound.isWorker,
                premium: clientFound.premium
            }, SECRET_KEY, { expiresIn: "8h" }));
            /* res.status(200).json(clientFound)   */
        }
        else if (workerFound) {
            return res.send(jsonwebtoken_1.default.sign({
                id: workerFound.id,
                user_mail: workerFound.user_mail,
                isAdmin: workerFound.isAdmin,
                isWorker: workerFound.isWorker,
                premium: workerFound.premium
            }, SECRET_KEY, { expiresIn: "8h" }));
            /* res.status(200).json(workerFound) */
        }
        else {
            res.send('usuario no encontrado');
        }
    }
    catch (error) {
        next(error);
    }
}));
auth.post("/client", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newClient = req.body;
    try {
        console.log("newClient", newClient);
        const hashedPassword = yield bcrypt.hash(newClient.password, 8);
        const clientGoogle = yield UserClient.create({
            name: newClient.name,
            lastName: newClient.lastName,
            user_mail: newClient.user_mail,
            born_date: newClient.born_date,
            password: hashedPassword,
            rating: newClient.rating,
            notification: newClient.notification,
            photo: newClient.photo,
            isActive: true,
            isWorker: false,
            isAdmin: false,
            premium: false
        });
        /* const completedClient = await UserClient.create({
            ...clientGoogle,
            password: hashedPassword
        })  */
        res.send(jsonwebtoken_1.default.sign({
            id: clientGoogle.id,
            user_mail: clientGoogle.user_mail,
            isAdmin: clientGoogle.isAdmin,
            isWorker: clientGoogle.isWorker,
            premium: clientGoogle.premium
        }, SECRET_KEY, { expiresIn: "8h" }));
    }
    catch (error) {
        next(error);
    }
}));
auth.post("/worker");
exports.default = auth;
