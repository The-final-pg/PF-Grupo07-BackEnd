import express from "express";
const router = express.Router();


const passport = require('passport');

/* 
router.use(passport.initialize())
require('./passport-config')(passport);
 */
const WorkerRoute = require("./workers.ts");

router.use("/register/worker", WorkerRoute);

router.get("/", (req,res,next)=>{
  console.log("asd")
 res.send("entre al get")
})

export default router