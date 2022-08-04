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
const passport = require("passport");
const passport_local_1 = require("passport-local");
const bcrypt = require("bcrypt");
require("dotenv").config();
/* const {SECRET_KEY} = process.env; */
const { UserWorker, UserClient } = require("../../db");
//Verificacion de usuario para log in
passport.use(new passport_local_1.Strategy({
    //recibe de los input los parametros
    usernameField: "user_mail",
    passwordField: "password" //lo que hace passport por atras --> let user_mail = usernameField
}, (user_mail, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const worker = yield UserWorker.findOne({ where: { user_mail: user_mail } }); //busca en ambas tablas el usuario
        const client = yield UserClient.findOne({ where: { user_mail: user_mail } });
        if (worker) { //dependiendo del usuario realiza diferentes acciones
            bcrypt.compare(password, worker.password, (error, result) => {
                if (error)
                    return done(error);
                if (!result) {
                    return done(null, false); //si tiene una discrepancia de pw devuelve null y false para el result.
                }
                else {
                    return done(null, worker); //si coincide, devuelve null para el error y el usuario para el result.
                }
            });
        }
        else if (client) {
            bcrypt.compare(password, client.password, (error, result) => {
                if (error)
                    return done(error);
                if (!result) {
                    return done(null, false);
                }
                else {
                    return done(null, client);
                }
            });
        }
    }
    catch (e) {
        return done(e, false); //si no encontro ningun usuario, devuelve result en false y el error que corresponda
    }
})));
