"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginRouter = void 0;
const express_1 = require("express");
const loginRouter = (0, express_1.Router)();
exports.loginRouter = loginRouter;
loginRouter.get("/google", (req, res) => res.send(req.user));
