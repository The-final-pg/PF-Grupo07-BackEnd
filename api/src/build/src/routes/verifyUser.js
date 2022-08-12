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
const verifyUser = express_1.default.Router();
const verifyUserController_1 = require("../controllers/verifyUserController");
verifyUser.put("/client/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const clientVerified = yield (0, verifyUserController_1.updateClientStatus)(id);
        console.log("clientVerified", clientVerified);
        res.json(clientVerified);
    }
    catch (error) {
        next(error);
    }
}));
verifyUser.put("/worker/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const workerVerified = yield (0, verifyUserController_1.updateWorkerStatus)(id);
        res.json(workerVerified);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = verifyUser;
