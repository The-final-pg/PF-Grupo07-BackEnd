"use strict";
const { Router } = require('express');
const clientRouter = require("./clients");
//import workerRouter from "./workers";
const router = Router();
router.use("/clients", clientRouter);
//router.use("/workers", workerRouter)
module.exports = router;
