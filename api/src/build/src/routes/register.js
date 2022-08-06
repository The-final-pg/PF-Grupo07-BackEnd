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
//Segun la ruta, ejecuta un post distinto: en '/register/client' es la siguiente:
register.post("/client", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newClient = req.body;
    try {
        // de toda la info que viene por body, tomamos la password y la hasheamos con el método hash de bcrypt
        const hashedPassword = yield bcrypt.hash(newClient.password, 8);
        // el 8 es para el tiempo de las iteraciones, mientras más tiempo más segura, pero con 8 es suficiente.
        let response;
        // guardamos en response todo lo que viene de body y la password hasheada,
        //que la va a recibir la funcion createClient en el controller.
        response = yield (0, registerController_1.createClient)(newClient, hashedPassword);
        res.send(response);
    }
    catch (error) {
        next(error);
    }
}));
//y en '/register/worker' la siguiente.
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
