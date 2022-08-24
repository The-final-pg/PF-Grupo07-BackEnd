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
const login = express_1.default.Router();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt = require("bcrypt");
const { SECRET_KEY, REWORK_MAIL } = process.env;
const express_session_1 = __importDefault(require("express-session")); //middleware
const passportConfig_1 = __importDefault(require("../utils/passport/passportConfig"));
const { UserWorker, UserClient } = require("../db");
const nodemailerConfig_1 = __importDefault(require("../utils/nodemailer/nodemailerConfig"));
// inicializamos passport
login.use(passportConfig_1.default.initialize());
// el urlencoded es para que lo que viene por body lo recibamos como string o array
login.use(express_1.default.urlencoded({ extended: true }));
// usa express session para alojarla en la consola en application Session storage
login.use((0, express_session_1.default)({
    secret: SECRET_KEY,
    resave: true,
    saveUninitialized: true
}));
// autenticación: verifica si el usuario es correcto. Lo busca en la base de datos en passportConfig. Si lo encuentra, genera el token con la info que nos importa para autorizar,
// osea si es worker o no y si es admin o no.
login.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    passportConfig_1.default.authenticate("local", { session: false }, (error, user) => __awaiter(void 0, void 0, void 0, function* () {
        if (error)
            return res.status(400).json("invalid");
        else if (!user)
            return res.json("invalid");
        else if (user.isActive !== true) {
            return res.status(401).send({ message: "Debes confirmar tu cuenta. Por favor verifica tu casilla de correo." });
        }
        else {
            console.log("esto esta en log", user);
            return res.send(yield jsonwebtoken_1.default.sign({
                id: user.id,
                user_mail: user.user_mail,
                isAdmin: user.isAdmin,
                isWorker: user.isWorker,
                premium: user.premium,
                isSuper: user.superAdmin
            }, SECRET_KEY, { expiresIn: "8h" }));
        }
    }))(req, res, next);
}));
login.post("/forgot-password", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_mail, type } = req.body;
    console.log("email", user_mail);
    try {
        const worker = yield UserWorker.findOne({ where: { user_mail: user_mail } });
        const client = yield UserClient.findOne({ where: { user_mail: user_mail } });
        //si no existe en la db
        if (!worker && !client) {
            res.send("Usuario inválido");
        }
        else {
            console.log("entre al post del forgot");
            // si existe, le mandamos por mail un token que expira en 15 m que lo lleva a reset password para que pueda cambiar la contraseña
            let user;
            if (worker) {
                user = worker;
            }
            else {
                user = client;
            }
            console.log("user del forgot", user);
            //hacer un token, devolverlo al front, agarrarlo y decodificarlo, 
            const token = jsonwebtoken_1.default.sign({
                user_mail: user.user_mail
            }, SECRET_KEY, { expiresIn: "15m" });
            const link = `https://re-work-ten.vercel.app/resetPassword?token=${token}`;
            console.log("link forgot password", link);
            if (type === "passwordreset") {
                nodemailerConfig_1.default.sendMail({
                    from: `"REWork" <${REWORK_MAIL}>`,
                    to: user.user_mail,
                    subject: "Completa tu solicitud de restablecimiento de contraseña",
                    html: `<!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta http-equiv="X-UA-Compatible" content="IE=edge">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    
                        <style>
                            p, a, h1, h2, h3, h4, h5, h6 {font-family: 'Poppins', sans-serif !important;}
                            h1{ font-size: 30px !important;}
                            h2{ font-size: 25px !important;}
                            h3{ font-size: 18px !important;}
                            h4{ font-size: 16px !important;}
                            p{font-size: 15px !important;}
                            a{font-size: 30px !important;}
                    
                            .claseBoton{
                                width: 30%;
                                    background-color: #fcae3b;
                                    border: 2px solid #fcae3b;
                                    color: black; 
                                    padding: 16px 32px;
                                    text-align: center;
                                    text-decoration: none;
                                    font-weight: bold;
                                    display: inline-block;
                                    font-size: 16px;
                                    margin: 4px 2px;
                                    transition-duration: 0.4s;
                                    cursor: pointer;
                            }
                            .claseBoton:hover{
                                background-color: #000000;
                                color: #ffffff;
                            }
                            .imag{
                                width: 20px;
                                height: 20px;
                            }
                            .contA{
                                margin: 0px 5px 0 5px;
                            }
                            .afooter{
                                color: #ffffff !important; 
                                text-decoration: none;
                                font-size: 13px !important;
                            }
                        </style>
                    </head>
                    <body>
                        <div style="width: 100%; background-color: #e3e3e3;">
                            <div style="padding: 20px 10px 20px 10px;">
                                <!-- Contenido principal -->
                                <div style="background-color: #ffffff; padding: 20px 0px 5px 0px; width: 100%; text-align: center;">
                                    <h1>¡Hola ${user.dataValues.name}!</h1>
                                    <h3>Has solicitado cambiar tu contraseña.</h3>
                                    <p>Haz click en el siguiente botón e ingresa una nueva contraseña.</p>
                                    
                                    <!-- Botón -->
                                    <a class="claseBoton" href="${link}">Restablecer contraseña</a>
                                    <br>
                                    <p>Si no has solicitado el cambio de tu contraseña, por favor comunícate con nosotros envíandonos un mensaje a ${REWORK_MAIL}.</p>
                                </div>
                    
                                <!-- Footer -->
                                <div style="background-color: #ffffff; color: #ffffff; padding: 5px 0px 0px 0px; width: 100%; text-align: center;">
                                    <p style="background-color: black; padding: 10px 0px 10px 0px; font-size: 12px !important;">
                                        © 2022 REwork, todos los derechos reservados.
                                    </p>
                                </div>
                                <!-- Footer -->
                            </div>
                        </div>
                    </body>
                    </html>`
                });
                res.send("Correo enviado");
            }
        }
    }
    catch (error) {
        res.send(error);
    }
}));
login.post("/reset-password", passportConfig_1.default.authenticate("bearer", { session: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token, password } = req.body;
    console.log("token reset password", token);
    console.log("password reset password", password);
    try {
        const email = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        console.log("email reset", email.user_mail);
        const worker = yield UserWorker.findOne({ where: { user_mail: email.user_mail } });
        const client = yield UserClient.findOne({ where: { user_mail: email.user_mail } });
        console.log("client", client);
        let user;
        if (!worker && !client) {
            res.send("Usuario inválido");
        }
        else {
            if (worker) {
                user = worker;
            }
            else {
                user = client;
            }
            const newPassword = yield bcrypt.hash(password, 8);
            yield user.set({ password: newPassword } /* , {where: {user_mail : verifyToken.user_mail }} */);
            yield user.save();
            res.send("Contraseña reestablecida");
        }
    }
    catch (error) {
        return error;
    }
}));
exports.default = login;
