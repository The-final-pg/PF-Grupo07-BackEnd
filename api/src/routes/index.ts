import express from 'express';

import workerRouter from "./workers";
import clientRouter from "./clients";
import offerRouter from './offer';
import proposalRouter from './proposal'


const router = express.Router();

router.use("/clients", clientRouter)
router.use("/workers", workerRouter)
router.use("/offer", offerRouter)
router.use("/proposal", proposalRouter)


module.exports = router;
