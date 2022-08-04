"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const clients_1 = __importDefault(require("./clients"));
const workers_1 = __importDefault(require("./workers"));
const router = express_1.default.Router();
router.use("/clients", clients_1.default);
router.use("/workers", workers_1.default);
module.exports = router;
