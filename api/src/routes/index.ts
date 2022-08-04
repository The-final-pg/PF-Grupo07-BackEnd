import express from 'express';

import workerRouter from "./workers";
import clientRouter from "./clients";
import offerRouter from './offer';
import proposalRouter from './proposal';
import portfolioRouter from './portfolio';


const router = express.Router();

router.use("/clients", clientRouter)
router.use("/workers", workerRouter)
router.use("/offer", offerRouter)
router.use("/proposal", proposalRouter)
router.use('/portfolio', portfolioRouter);

module.exports = router;
