import express from "express";
import workerRouter from "./workers";
import clientRouter from "./clients";
import offerRouter from "./offer";
import proposalRouter from "./proposal";
import portfolioRouter from "./portfolio";
import register from "./register";
import login from "./login";
import logout from "./logout";
<<<<<<< HEAD
import profession from './profession';
import skills from './skills';
=======
import profession from "./profession";
import skills from "./skills";
import review from "./review";
import verifyUser from "./verifyUser";
import tokenVerify from "./tokenVerify";
>>>>>>> bb6b88afcb0a9b38ecb012339db351455856ac50

const router = express.Router();

router.use("/client", clientRouter);
router.use("/worker", workerRouter);
router.use("/offer", offerRouter);
router.use("/proposal", proposalRouter);
router.use("/portfolio", portfolioRouter);
router.use("/register", register);
router.use("/login", login);
router.use("/logout", logout);
<<<<<<< HEAD
router.use('/profession', profession);
router.use('/skills', skills);


export default router;
=======
router.use("/profession", profession);
router.use("/skills", skills);
router.use("/review", review);
router.use("/confirm", verifyUser);
router.use("/tokenVerify", tokenVerify)

export default router;
>>>>>>> bb6b88afcb0a9b38ecb012339db351455856ac50
