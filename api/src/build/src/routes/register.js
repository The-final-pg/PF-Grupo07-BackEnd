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
<<<<<<< HEAD
//Segun la ruta, ejecuta un post distinto: en '/register/client' es la siguiente:
register.post("/client", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newClient = req.body;
=======
const nodemailerConfig_1 = __importDefault(require("../utils/nodemailer/nodemailerConfig"));
const { REWORK_MAIL } = process.env;
//Segun la ruta, ejecuta un post distinto: en '/register/client' es la siguiente:
register.post("/client", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newClient = req.body;
    if (newClient.photo === '')
        delete newClient.photo;
    console.log("newclient", newClient);
    /* const token = jwt.sign({email: newClient.user_mail}, SECRET_KEY) */
>>>>>>> bb6b88afcb0a9b38ecb012339db351455856ac50
    try {
        // de toda la info que viene por body, tomamos la password y la hasheamos con el método hash de bcrypt
        const hashedPassword = yield bcrypt.hash(newClient.password, 8);
        // el 8 es para el tiempo de las iteraciones, mientras más tiempo más segura, pero con 8 es suficiente.
<<<<<<< HEAD
        let response;
        // guardamos en response todo lo que viene de body y la password hasheada,
        //que la va a recibir la funcion createClient en el controller.
        response = yield (0, registerController_1.createClient)(newClient, hashedPassword);
        res.send(response);
=======
        // guardamos en response todo lo que viene de body y la password hasheada,
        //que la va a recibir la funcion createClient en el controller.
        let clientCreated;
        clientCreated = yield (0, registerController_1.createClient)(newClient, hashedPassword);
        const id = clientCreated.dataValues.id;
        nodemailerConfig_1.default.sendMail({
            from: `"REWork" <${REWORK_MAIL}>`,
            to: clientCreated.dataValues.user_mail,
            subject: "Bienvenido a REWork",
            html: `<span>Más de 1000 freelancers disponibles para concretar tus proyectos, ¿qué estás esperando?</span>
              <b>Confirma tu cuenta <a href="https://rework-xi.vercel.app/confirm/client/${id}"> AQUÍ </a> </b>`
        });
        res.send({ message: "Usuario registrado exitosamente! Por favor, verifica tu casilla de correo." });
>>>>>>> bb6b88afcb0a9b38ecb012339db351455856ac50
    }
    catch (error) {
        next(error);
    }
}));
//y en '/register/worker' la siguiente.
register.post("/worker", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
<<<<<<< HEAD
    const worker = req.body;
    try {
        const hashedPassword = yield bcrypt.hash(worker.password, 8);
        let response;
        response = yield (0, registerController_1.createWorker)(worker, hashedPassword);
        res.send(response);
=======
    const newWorker = req.body;
    if (newWorker.photo === '')
        delete newWorker.photo;
    try {
        const hashedPassword = yield bcrypt.hash(newWorker.password, 8);
        let workerCreated;
        workerCreated = yield (0, registerController_1.createWorker)(newWorker, hashedPassword);
        const id = workerCreated.dataValues.id;
        nodemailerConfig_1.default.sendMail({
            from: `"REWork" <${REWORK_MAIL}>`,
            to: workerCreated.dataValues.user_mail,
            subject: "Bienvenido a REWork",
            html: `<span>Más de 1000 proyectos esperando ser concretados, ¿qué esperás para postularte?</span>
              <b>Confirma tu cuenta <a href="https://rework-xi.vercel.app/confirm/worker/${id}"> AQUÍ </a> </b>`
        });
        res.send({ message: "Usuario registrado exitosamente! Por favor, verifica tu casilla de correo." });
>>>>>>> bb6b88afcb0a9b38ecb012339db351455856ac50
    }
    catch (error) {
        next(error);
    }
}));
exports.default = register;
