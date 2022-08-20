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
    callbackURL: "http://localhost:3001/auth/client/callback",
    passReqToCallback: true
}, (_req, accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("refreshToken", refreshToken);
    console.log("accessToken", accessToken);
    const clientFound = yield UserClient.findOne({ where: { googleId: profile.id } });
    console.log("Client Found", clientFound);
    if (!clientFound) {
        const client = yield UserClient.create({
            googleId: profile.id,
            user_mail: profile.emails[0].value,
            name: profile.name.givenName,
            lastName: profile.name.familyName,
            photo: profile.photos[0].value,
            password: "Rework22"
        });
        console.log("clientcreated", client);
        if (client)
            return done(null, client);
    }
    else {
        return done(null, clientFound);
    }
    return done(null, profile);
})));
passportGoogleClient.serializeUser((user, done) => {
    done(null, user);
});
passportGoogleClient.deserializeUser((user, done) => {
    done(null, user);
});
exports.default = passportGoogleClient;
/* passport.use(new GoogleStrategy({
    clientID: keys.GOOGLE.clientID,
    clientSecret: keys.GOOGLE.clientSecret,
    callbackURL: "/auth/google/callback"
},
(accessToken, refreshToken, profile, cb) => {
    console.log(chalk.blue(JSON.stringify(profile)));
    user = { ...profile };
    return cb(null, profile);
}));




/* console.log("accessToken", accessToken)
console.log("refreshToken", refreshToken)
console.log("auth con google", (JSON.stringify(profile)))
const client = {...profile};
return done(null, client) */
/* const client: ClientType = await UserClient.findOne({where : { user_mail : profile.user_mail[0].value }})
console.log("entre a strategy google client")
if(client) {
        done(null, profile)
    } else {
        const clientGoogle = await UserClient.create({
            name: profile.displayName,
            user_mail : profile.user_mail[0].value,
            id: profile.id,
        })
        UserClient.save(clientGoogle)
        done(null, profile)
    } */
/* const client: ClientType = await UserClient.findOrCreate({ where: {user_mail : profile.user_mail[0].value }})
console.log("clientgoogle", client)
return client   */
