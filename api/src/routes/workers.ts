const RouterWorker = require("express");
import { createWorker } from "../controllers/create/createWorker";
const routerWorker = RouterWorker()

routerWorker.post("/", createWorker)

module.exports = routerWorker; 