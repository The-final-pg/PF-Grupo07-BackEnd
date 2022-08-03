import express from 'express';

import clientRouter from "./clients";
import offerRouter from './offer';
import proposalRouter from './proposal'
//import workerRouter from "./workers";

const router = express.Router();

router.use("/clients", clientRouter)
router.use("/offer", offerRouter)
router.use("/proposal", proposalRouter)
//router.use("/workers", workerRouter)

module.exports = router;
