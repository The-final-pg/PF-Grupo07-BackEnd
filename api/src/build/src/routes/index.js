"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const workers_1 = __importDefault(require("./workers"));
const clients_1 = __importDefault(require("./clients"));
const offer_1 = __importDefault(require("./offer"));
const proposal_1 = __importDefault(require("./proposal"));
const portfolio_1 = __importDefault(require("./portfolio"));
const register_1 = __importDefault(require("./register"));
const login_1 = __importDefault(require("./login"));
const logout_1 = __importDefault(require("./logout"));
const profession_1 = __importDefault(require("./profession"));
const skills_1 = __importDefault(require("./skills"));
const review_1 = __importDefault(require("./review"));
const verifyUser_1 = __importDefault(require("./verifyUser"));
const tokenVerify_1 = __importDefault(require("./tokenVerify"));
const payment_1 = __importDefault(require("./payment"));
const admin_1 = __importDefault(require("./admin"));
const loginGoogle_1 = __importDefault(require("./loginGoogle"));
const passport_1 = __importDefault(require("passport"));
const googleUse_1 = require("./googleUse");
const auth_1 = __importDefault(require("./auth"));
const router = express_1.default.Router();
router.use("/client", clients_1.default);
router.use("/worker", workers_1.default);
router.use("/offer", offer_1.default);
router.use("/proposal", proposal_1.default);
router.use("/portfolio", portfolio_1.default);
router.use("/register", register_1.default);
router.use("/login", login_1.default);
router.use("/logout", logout_1.default);
router.use("/profession", profession_1.default);
router.use("/skills", skills_1.default);
router.use("/review", review_1.default);
router.use("/confirm", verifyUser_1.default);
router.use("/tokenVerify", tokenVerify_1.default);
router.use("/payments", payment_1.default);
router.use("/admin", admin_1.default);
router.use("/auth", auth_1.default);
router.use("/loginGoogle", loginGoogle_1.default); // antes auth con google strategy
router.get("/google", passport_1.default.authenticate("auth-google", {
    scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
    ],
    session: false,
}), googleUse_1.loginRouter);
exports.default = router;
