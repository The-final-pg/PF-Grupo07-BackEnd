"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const bcrypt = require("bcrypt");
const workerController_1 = require("../controllers/workerController");
router.get("/:idWorker", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const idWorker = req.params.idWorker;
    try {
        if (idWorker) {
            const workerById = yield (0, workerController_1.getWorkerById)(idWorker);
            return res.json(workerById);
        }
        else {
            throw new Error("worker id not found");
        }
    }
    catch (error) {
        next(error);
    }
}));
router.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    
    const worker = req.body;
    try {
        const hashedPassword = yield bcrypt.hash(worker.password, 8);
        let response;
        response = yield (0, workerController_1.createWorker)(worker, hashedPassword);
        res.send(response);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
