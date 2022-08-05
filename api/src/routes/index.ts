import express from "express";
import workerRouter from "./workers";
import clientRouter from "./clients";
import offerRouter from "./offer";
import proposalRouter from "./proposal";
import portfolioRouter from "./portfolio";
import register from "./register";
import login from "./login";
import logout from "./logout";

const router = express.Router();

router.use("/clients", clientRouter);
router.use("/workers", workerRouter);
router.use("/offer", offerRouter);
router.use("/proposal", proposalRouter);
router.use("/portfolio", portfolioRouter);
router.use("/register", register);
router.use("/login", login);
router.use("/logout", logout);

module.exports = router;
