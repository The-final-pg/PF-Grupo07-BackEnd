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
const tokenVerify = express_1.default.Router();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const { SECRET_KEY } = process.env;
const passportConfig_1 = __importDefault(require("../utils/passport/passportConfig"));
const express_session_1 = __importDefault(require("express-session"));
// inicializamos passport
tokenVerify.use(passportConfig_1.default.initialize());
// el urlencoded es para que lo que viene por body lo recibamos como string o array
tokenVerify.use(express_1.default.urlencoded({ extended: true }));
// usa express session para alojarla en la consola en application Session storage
tokenVerify.use((0, express_session_1.default)({
    secret: SECRET_KEY,
    resave: true,
    saveUninitialized: true
}));
tokenVerify.get("/:expDate", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //expDate recibe la fecha de expiracion del token en segundos
    const expDate = req.params.expDate;
    try {
        //se genera en date la fecha actual en segundos
        const date = new Date().getTime() / 1000;
        //si la fecha actual es mayor a la de expiracion por mas de 30 minutos O si fecha expiracion mayor a fecha actual por menos de 15 minutos
        if (date < expDate && (expDate - date) < 570 || expDate < date && (date - expDate) < 900) {
            //devuelve 'renew' al front para renovar el token
            res.send('renew');
            //si la fecha de expiracion es mayor    a la actual por más de 15 minutos
        }
        else if (expDate < date && date - expDate > 900) {
            //devuelve 'destroy' al front para destruir el token
            res.send('destroy');
            //si la fecha de expiracion es menor a la actual por mas de 30 minutos
        }
        else if (date < expDate && (expDate - date) > 570) {
            //devuelve 'valid' al front para no modificar el token
            res.send('valid');
        }
    }
    catch (error) {
        next(error);
    }
}));
tokenVerify.post("/renew", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newToken = req.body;
        const renewedToken = yield jsonwebtoken_1.default.sign({
            id: newToken.id,
            user_mail: newToken.user_mail,
            isAdmin: newToken.isAdmin,
            isWorker: newToken.isWorker,
            premium: newToken.premium,
            superAdmin: newToken.superAdmin,
            exp: newToken.exp
        }, SECRET_KEY);
        res.send(renewedToken);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = tokenVerify;
