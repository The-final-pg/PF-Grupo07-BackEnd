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
const passportConfig_1 = __importDefault(require("../utils/passport/passportConfig"));
login.use(passportConfig_1.default.initialize());
login.use(passportConfig_1.default.session());
// el urlencoded es para que lo que viene por body lo recibamos como string o array
login.use(express_1.default.urlencoded({ extended: true }));
login.post("/in", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    passportConfig_1.default.authenticate("local", { session: false }, (error, user) => __awaiter(void 0, void 0, void 0, function* () {
        if (error)
            return next(error);
        else if (!user)
            return res.json("Inserte un token válido");
        else {
            console.log("esto esta en log", user);
            return res.send(yield jsonwebtoken_1.default.sign({
                id: user.id,
                user_mail: user.user_mail,
                isAdmin: user.isAdmin,
                isWorker: user.isWorker
            }, SECRET_KEY, { expiresIn: "24hr" }));
        }
    }))(req, res, next);
}));
exports.default = login;
