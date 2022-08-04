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
const router = express_1.default.Router();
router.use("/clients", clients_1.default);
router.use("/workers", workers_1.default);
router.use("/offer", offer_1.default);
router.use("/proposal", proposal_1.default);
router.use('/portfolio', portfolio_1.default);
module.exports = router;
