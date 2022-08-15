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
const { SECRET_KEY } = process.env;
const express_session_1 = __importDefault(require("express-session")); //middleware
const passportConfig_1 = __importDefault(require("../utils/passport/passportConfig"));
const googleClientConfig_1 = __importDefault(require("../utils/passport/googleClientConfig"));
const googleWorkerConfig_1 = __importDefault(require("../utils/passport/googleWorkerConfig"));
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
//login.use(passport.authenticate("session"))
// autenticación: verifica si el usuario es correcto. Lo busca en la base de datos en passportConfig. Si lo encuentra, genera el token con la info que nos importa para autorizar,
// osea si es worker o no y si es admin o no.
login.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    passportConfig_1.default.authenticate("local", { session: false }, (error, user) => __awaiter(void 0, void 0, void 0, function* () {
        if (error)
            return next(error);
        else if (!user)
            return res.json("Inserte un token válido");
        else if (user.isActive !== true) {
            return res.status(401).send({ message: "Debes confirmar tu cuenta. Por favor verifica tu casilla de correo." });
        }
        else {
            console.log("esto esta en log", user);
            return res.send(yield jsonwebtoken_1.default.sign({
                id: user.id,
                user_mail: user.user_mail,
                isAdmin: user.isAdmin,
                isWorker: user.isWorker
            }, SECRET_KEY, { expiresIn: "10m" }));
        }
    }))(req, res, next);
}));
login.get("/successClient", (req, res) => {
    if (req.user) {
        return res.status(200).json({
            success: true,
            message: "success",
            client: req.user,
            token: jsonwebtoken_1.default.sign({
                id: req.user.id,
                user_mail: req.user.user_mail,
                isAdmin: false,
                isWorker: false
            }, SECRET_KEY, { expiresIn: "10m" })
        });
    }
});
login.get("/successWorker", (req, res) => {
    if (req.user) {
        return res.status(200).json({
            success: true,
            message: "success",
            worker: req.user,
            token: jsonwebtoken_1.default.sign({
                id: req.user.id,
                user_mail: req.user.user_mail,
                isAdmin: false,
                isWorker: true
            }, SECRET_KEY, { expiresIn: "10m" })
        });
    }
});
login.get("/failure", (req, res) => {
    console.log("failure", req.user);
    res.status(401).json({
        success: false,
        message: "failure"
    });
});
login.post("/google/worker", googleWorkerConfig_1.default.authenticate("google", { scope: ["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email"] }));
login.post("/google/client", googleClientConfig_1.default.authenticate("google", { scope: ["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email"] }));
login.get("/google/worker/callback", googleWorkerConfig_1.default.authenticate("google", {
    successRedirect: "/successWorker",
    failureRedirect: "/failure"
}));
login.get("/google/client/callback", googleClientConfig_1.default.authenticate("google", {
    successRedirect: "/successClient",
    failureRedirect: "/failure"
}));
exports.default = login;
