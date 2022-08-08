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
    /* const multiplier: number = req.body.multiplier; */
    try {
        const worker = yield (0, workerController_1.getAllWorkers)( /* multiplier */);
        res.send(worker);
    }
    catch (error) {
        next(error);
    }
}));
worker.get("/search", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { q, p, r } = req.query;
    /*     const multiplier: number = req.body.multiplier; */
    try {
        let worker;
        if (q && !p && !r) {
            worker = yield (0, workerController_1.getWorkerByName)(q /* , multiplier */);
        }
        else if (q && p && !r) {
            worker = yield (0, filteredSearchWorker_1.workerFilteredByProfession)(q, p /* , multiplier */);
        }
        else if (!q && p && !r) {
            worker = yield (0, filteredSearchWorker_1.workerFilteredByProfession)(q, p /* , multiplier */);
        }
        else if (q && !p && r) {
            worker = yield (0, filteredSearchWorker_1.workerFilteredByRating)(q, r /* , multiplier */);
        }
        else if (!q && !p && r) {
            worker = yield (0, filteredSearchWorker_1.workerFilteredByRating)(q, r /* , multiplier */);
        }
        else {
            worker = yield (0, filteredSearchWorker_1.workerAllfiltersOn)(q, p, r /* , multiplier */);
        }
        res.send(worker);
    }
    catch (error) {
        next(error instanceof Error);
    }
}));
worker.get("/:idWorker", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { idWorker } = req.params;
    try {
        const workerById = yield (0, workerController_1.getWorkerById)(idWorker);
        return res.json(workerById);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = worker;
