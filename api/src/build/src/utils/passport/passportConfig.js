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
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const passport_http_bearer_1 = require("passport-http-bearer");
const bcrypt_1 = __importDefault(require("bcrypt"));
require("dotenv").config();
const { UserWorker, UserClient } = require("../../db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const { SECRET_KEY } = process.env;
//Verificacion de usuario para log in
passport_1.default.use(new passport_local_1.Strategy({
    //recibe de los input los parametros
    usernameField: "user_mail",
    passwordField: "password" //lo que hace passport por atras --> let user_mail = usernameField
}, (user_mail, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const worker = yield UserWorker.findOne({ where: { user_mail: user_mail } }); //busca en ambas tablas el usuario
        const client = yield UserClient.findOne({ where: { user_mail: user_mail } });
        let user;
        if (worker) {
            user = worker; //dependiendo del usuario realiza diferentes acciones
        }
        else {
            user = client;
        }
        console.log("estos en config", user.dataValues);
        console.log("esto es el worker", worker);
        bcrypt_1.default.compare(password, user.password, (error, result) => {
            if (error)
                return done(error);
            if (!result) {
                return done(null, false);
            }
            else {
                return done(null, user.dataValues);
            }
        });
        /* bcrypt.compare(password, worker.password, (error, result) => {
            if (error) return done(error)
            if (!result) {
                return done(null, false)//si tiene una discrepancia de pw devuelve null y false para el result.
            } else {
                return done (null, {id: worker.id})//si coincide, devuelve null para el error y el usuario para el result.
            } */
    }
    catch (e) {
        return done(e, false); //si no encontro ningun usuario, devuelve result en false y el error que corresponda
    }
})));
// serializacion y deserializacion de worker
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const worker = yield UserWorker.findOne({ where: { id } });
        const client = yield UserClient.findOne({ where: { id } });
        if (worker) {
            done(null, worker);
        }
        else if (client) {
            done(null, client);
        }
        ;
    }
    catch (e) {
        done(e, null);
    }
}));
passport_1.default.use(new passport_http_bearer_1.Strategy((token, done) => {
    jsonwebtoken_1.default.verify(token, SECRET_KEY, function (err, user) {
        if (err)
            return done(err);
        console.log('Estoy ene l verify', token);
        return done(null, user ? user : false);
    });
}));
/* // serializacion y deserializacion de client
passport.serializeUser((client: any, done) => {
    done(null, client.id);
});
  
passport.deserializeUser(async (id, done) => {
    try{
        const client = await UserClient.findOne({ where: { id } })
        if (client) done(null, client);
    }catch(e){
        done(e, null);
    }
});
 */
exports.default = passport_1.default;
