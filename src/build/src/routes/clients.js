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
const clientController_1 = require("../controllers/clientController");
router.get("/", (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clients = yield (0, clientController_1.getAllClients)();
        res.json(clients);
    }
    catch (error) {
        next(error);
    }
}));
router.get("/:idClient", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { idClient } = req.params;
    try {
        const client = yield (0, clientController_1.getClientById)(idClient);
        return res.json(client);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
