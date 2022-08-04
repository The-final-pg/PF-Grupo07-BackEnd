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
const register = express_1.default.Router();
const bcrypt = require("bcrypt");
const registerController_1 = require("../controllers/registerController");
register.post("/client", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newClient = req.body;
    try {
        const hashedPassword = yield bcrypt.hash(newClient.password, 8);
        console.log("pw", hashedPassword);
        console.log("client", newClient);
        let response;
        response = yield (0, registerController_1.createClient)(newClient, hashedPassword);
        res.send(response);
    }
    catch (error) {
        next(error);
    }
}));
register.post("/worker", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const worker = req.body;
    try {
        const hashedPassword = yield bcrypt.hash(worker.password, 8);
        let response;
        response = yield (0, registerController_1.createWorker)(worker, hashedPassword);
        res.send(response);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = register;
