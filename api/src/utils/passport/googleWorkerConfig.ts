import passportGoogleWorker from "passport";
/* import { Request } from "express"
import { Profile } from 'passport'; */
import { Strategy as GoogleStrategy} from 'passport-google-oauth20';
require("dotenv").config();
const { GOOGLE_CLIENT_ID, GOOGLE_SECRET } = process.env;
import { WorkerType } from "../../types";
const { UserWorker } = require ("../../db");

//passportGoogleWorker.use(new GoogleStrategy({
  //  clientID: GOOGLE_CLIENT_ID,
   // clientSecret: GOOGLE_SECRET,
  //  callbackURL: "http://localhost:3001/auth/worker/callback",
  //  passReqToCallback: true
    /* response_type: "code" */
//}, async (_req: Request, accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
 //   console.log("refreshToken", refreshToken)
 //   console.log("accessToken", accessToken)
    /* const providerData = profile._json;
    providerData.accessToken = accessToken;
    providerData.refreshToken = refreshToken; */
//    const workerFound: WorkerType = await UserWorker.findOne({where: {googleId: profile.id}})
    // agregar autenticacion de que si lo encuentra en client lo mande al login normal.

 //   console.log("workerFound", workerFound)
 //   if(!workerFound){
  //      const worker = await UserWorker.create({
   //         googleId: profile.id,
   //         user_mail: profile.emails[0].value,
   //         name: profile.name.givenName,
   //         lastName: profile.name.familyName,
   //         photo: profile.photos[0].value,
  //          password: "Rework22",
  //          profession: ["Facilitator"],
  //          skills: ["Central"]
  //      }) 
  //      console.log("workercreated", worker)
  //      if(worker) return done(null, worker)
  //  } else{
  //      console.log("workerFoundultimo", workerFound)
   //     return done(null, workerFound)
  //  }
    /* return done(null, profile) */
//}))


//passportGoogleWorker.serializeUser((user: any, done: VerifyCallback )=> {
 //   done(null, user);
//});


//passportGoogleWorker.deserializeUser((user: any, done: VerifyCallback) => {
//    done(null, user);
//});               


passportGoogleWorker.use(
    "auth-google",
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_SECRET,
        callbackURL: "http://localhost:3000/google",
      },
      async function (_accessToken, _refreshToken, profile, done) {
        console.log("google responde",profile.id)
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

export default passportGoogleWorker








