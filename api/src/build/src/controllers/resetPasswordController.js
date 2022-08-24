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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateWorkerStatus = exports.resetPassword = void 0;
const { UserClient, UserWorker } = require("../db");
function resetPassword(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const clientVerified = yield UserClient.findByPk(id);
        yield clientVerified.set({ isActive: true });
        yield clientVerified.save();
        return clientVerified;
    });
}
exports.resetPassword = resetPassword;
function updateWorkerStatus(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const workerVerified = yield UserWorker.findByPk(id);
        yield workerVerified.set({ isActive: true });
        yield workerVerified.save();
        return workerVerified;
    });
}
exports.updateWorkerStatus = updateWorkerStatus;
