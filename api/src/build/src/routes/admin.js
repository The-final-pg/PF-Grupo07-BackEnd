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
const admin = express_1.default.Router();
const adminController_1 = require("../controllers/adminController");
admin.get("/users", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { isActive } = req.query;
    try {
        const users = yield (0, adminController_1.getAllUsers)(isActive);
        res.json(users);
    }
    catch (error) {
        next(error);
    }
    ;
}));
admin.get("/offers", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { isActive } = req.query;
    try {
        const offers = yield (0, adminController_1.getOfferFiltered)(isActive);
        res.json(offers);
    }
    catch (error) {
        next(error);
    }
}));
admin.put("/profession", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profession = req.body.profession;
        const response = yield (0, adminController_1.addNewProfessions)(profession);
        res.json(response);
    }
    catch (error) {
        next(error);
    }
    ;
}));
admin.put("/profession/delete", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const array = req.body.array;
        const profession = req.body.profession;
        const response = yield (0, adminController_1.deleteProfession)(array, profession);
        res.json(response);
    }
    catch (error) {
        next(error);
    }
    ;
}));
admin.put("/skills", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const skill = req.body.skills;
        const response = yield (0, adminController_1.addNewSkills)(skill);
        res.json(response);
    }
    catch (error) {
        next(error);
    }
    ;
}));
admin.put("/skills/delete", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const array = req.body.array;
        const skill = req.body.skill;
        const response = yield (0, adminController_1.deleteSkill)(array, skill);
        res.json(response);
    }
    catch (error) {
        next(error);
    }
    ;
}));
admin.put("/users/isActive", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { isWorker, id, /* isAdmin, */ isActive } = req.body;
    try {
        let message = yield (0, adminController_1.updateUser)(/* isAdmin, */ isActive, isWorker, id);
        res.json(message);
    }
    catch (error) {
        next(error);
    }
}));
admin.put("/users/isAdmin", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { isWorker, id, /* isAdmin, */ isAdmin } = req.body;
    try {
        let message = yield (0, adminController_1.updateUserAdmin)(/* isAdmin, */ isAdmin, isWorker, id);
        res.json(message);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = admin;
