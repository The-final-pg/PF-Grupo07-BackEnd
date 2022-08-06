import express, { Response } from "express";
const logout = express.Router();

import passport from "../utils/passport/passportConfig";
logout.use(passport.initialize());
logout.use(passport.session());

logout.post("/", (req: any, res: Response) => {
  req.logOut();
  req.session = null;
  res.send("Sesión finalizada");
});

export default logout;

