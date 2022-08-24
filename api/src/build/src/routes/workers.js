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
const worker = express_1.default.Router();
const workerController_1 = require("../controllers/workerController");
const filteredSearchWorker_1 = require("../services/filteredSearchWorker");
worker.get("/", (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const worker = yield (0, workerController_1.getAllWorkers)();
        res.send(worker);
    }
    catch (error) {
        next(error);
    }
}));
worker.get("/search", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { q, p, r } = req.query;
    try {
        let worker;
        if (q && !p && !r) {
            worker = yield (0, workerController_1.getWorkerByName)(q);
        }
        else if (q && p && !r) {
            worker = yield (0, filteredSearchWorker_1.workerFilteredByProfession)(q, p);
        }
        else if (!q && p && !r) {
            worker = yield (0, filteredSearchWorker_1.workerFilteredByProfession)(q, p);
        }
        else if (q && !p && r) {
            worker = yield (0, filteredSearchWorker_1.workerFilteredByRating)(q, r);
        }
        else if (!q && !p && r) {
            worker = yield (0, filteredSearchWorker_1.workerFilteredByRating)(q, r);
        }
        else {
            worker = yield (0, filteredSearchWorker_1.workerAllfiltersOn)(q, p, r);
        }
        res.send(worker);
    }
    catch (error) {
        next(error instanceof Error);
    }
}));
worker.put("/premium", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body.id;
        const premium = req.body.premium;
        if (premium) {
            const response = yield (0, workerController_1.putWorkerPremium)(id, premium);
            return res.send(response);
        }
        else {
            res.send("El estado premium es false");
        }
        ;
    }
    catch (error) {
        next(error);
    }
}));
worker.get("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const workerById = yield (0, workerController_1.getWorkerById)(id);
        return res.json(workerById);
    }
    catch (error) {
        next(error);
    }
}));
worker.put("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { name, lastName, born_date, photo, profession, skills, favorites, description, } = req.body;
    try {
        const workerUpdate = yield (0, workerController_1.updateWorkerProfile)(id, name, lastName, born_date, photo, profession, skills, favorites, description);
        res.json(workerUpdate);
    }
    catch (error) {
        next(error);
    }
}));
worker.put("/bank", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, bank_data } = req.body;
    try {
        const updateWorkerDataBank = yield (0, workerController_1.addBankDataWorker)(id, bank_data);
        return res.json(updateWorkerDataBank);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = worker;
// cambiar password
