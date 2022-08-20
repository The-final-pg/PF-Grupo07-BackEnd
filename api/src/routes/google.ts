import passport from "passport";
import { OAuth2Strategy as GoogleStrategy } from "passport-google-oauth";
require("dotenv").config();
const { GOOGLE_CLIENT_ID, GOOGLE_SECRET } = process.env;
import { WorkerType } from "../types";
const { UserWorker } = require ("../db");


passport.use(
  "auth-google",
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_SECRET,
      callbackURL: "http://localhost:3000/google",
    },
    async function (_accessToken, _refreshToken, profile, done) {
        const workerFound: WorkerType = await UserWorker.findOne({where: {googleId: profile.id}})
        console.log("workerFound", workerFound)
            if(!workerFound){
                const worker = await UserWorker.create({
                    googleId: profile.id,
                    user_mail: profile.emails[0].value,
                    name: profile.name.givenName,
                    lastName: profile.name.familyName,
                    photo: profile.photos[0].value,
                    password: "Rework22",
                    profession: ["Facilitator"],
                    skills: ["Central"]
                }) 
                console.log("workercreated", worker)
                if(worker) return done(null, worker)
            } else{
                console.log("workerFoundultimo", workerFound)
                return done(null, workerFound)
            }
    }
  )
);