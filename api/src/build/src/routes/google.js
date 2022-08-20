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
const passport_google_oauth_1 = require("passport-google-oauth");
require("dotenv").config();
const { GOOGLE_CLIENT_ID, GOOGLE_SECRET } = process.env;
const { UserWorker } = require("../db");
passport_1.default.use("auth-google", new passport_google_oauth_1.OAuth2Strategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_SECRET,
    callbackURL: "http://localhost:3000/google",
}, function (_accessToken, _refreshToken, profile, done) {
    return __awaiter(this, void 0, void 0, function* () {
        const workerFound = yield UserWorker.findOne({ where: { googleId: profile.id } });
        console.log("workerFound", workerFound);
        if (!workerFound) {
            const worker = yield UserWorker.create({
                googleId: profile.id,
                user_mail: profile.emails[0].value,
                name: profile.name.givenName,
                lastName: profile.name.familyName,
                photo: profile.photos[0].value,
                password: "Rework22",
                profession: ["Facilitator"],
                skills: ["Central"]
            });
            console.log("workercreated", worker);
            if (worker)
                return done(null, worker);
        }
        else {
            console.log("workerFoundultimo", workerFound);
            return done(null, workerFound);
        }
    });
}));
