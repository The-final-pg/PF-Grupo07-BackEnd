import express from "express";
import workerRouter from "./workers";
import clientRouter from "./clients";
import offerRouter from "./offer";
import proposalRouter from "./proposal";
import portfolioRouter from "./portfolio";
import register from "./register";
import login from "./login";
import logout from "./logout";
import profession from "./profession";
import skills from "./skills";
import review from "./review";
import verifyUser from "./verifyUser";
import tokenVerify from "./tokenVerify";
import payment from "./payment";
import admin from "./admin";
import auth from "./auth"

const router = express.Router();

router.use("/client", clientRouter);
router.use("/worker", workerRouter);
router.use("/offer", offerRouter);
router.use("/proposal", proposalRouter);
router.use("/portfolio", portfolioRouter);
router.use("/register", register);
router.use("/login", login);
router.use("/logout", logout);
router.use("/profession", profession);
router.use("/skills", skills);
router.use("/review", review);
router.use("/confirm", verifyUser);
router.use("/tokenVerify", tokenVerify);
router.use("/payments", payment);
router.use("/admin", admin);
router.use("/auth", auth)

export default router;
