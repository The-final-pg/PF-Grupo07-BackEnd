import express from 'express';

const clientRouter = require ("./clients")
//import workerRouter from "./workers";

const router = express.Router();

router.use("/clients", clientRouter)
//router.use("/workers", workerRouter)

module.exports = router;
