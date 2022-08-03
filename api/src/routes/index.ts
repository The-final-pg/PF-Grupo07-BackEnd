const {Router} = require('express')
const clientRouter = require("./clients")
const offerRouter = require('./offer')
//import workerRouter from "./workers";

const router = Router();

router.use("/clients", clientRouter)
router.use("/offer", offerRouter)
//router.use("/workers", workerRouter)

module.exports = router;