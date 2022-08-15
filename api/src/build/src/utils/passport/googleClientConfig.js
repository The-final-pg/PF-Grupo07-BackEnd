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
const passportGoogleClient = require("passport");
const passport_google_oauth20_1 = require("passport-google-oauth20");
require("dotenv").config();
const { GOOGLE_CLIENT_ID, GOOGLE_SECRET } = process.env;
const { UserClient } = require("../../db");
passportGoogleClient.use(new passport_google_oauth20_1.Strategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_SECRET,
    callbackURL: "http://localhost:3000/auth/google/login/google/client"
}, (/* accessToken, refreshToken, */ profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield UserClient.findOne({ where: { user_mail: profile.user_mail[0].value } });
        if (client) {
            done(null, profile);
        }
        else {
            yield UserClient.create({ user_mail: profile.user_mail[0].value });
            done(null, profile);
        }
        /* const client: ClientType = await UserClient.findOrCreate({ where: {user_mail : profile.user_mail[0].value }})
        console.log("clientgoogle", client)
        return client   */
    }
    catch (error) {
        return error;
    }
})));
passportGoogleClient.serializeUser((user, done) => {
    done(null, user);
});
passportGoogleClient.deserializeUser((user, done) => {
    done(null, user);
});
exports.default = passportGoogleClient;
