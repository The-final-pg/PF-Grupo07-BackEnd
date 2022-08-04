import express from 'express';

import clientRouter from "./clients"
import workerRouter from "./workers";

const router = express.Router();

router.use("/clients", clientRouter)
router.use("/workers", workerRouter)

module.exports = router;
