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
const app_1 = __importDefault(require("./src/app"));
const { conn } = require("./src/db");
/* import {
  setData,
  setOffers,
  setProposals,
  setPortfolios,
  setReview,
} from "./data"; */
/* const setData =require('./data');
const setOffersAndProposals =require('./data'); */
const portRailway = process.env.PORT;
// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
    app_1.default.listen(portRailway || 3001, () => __awaiter(void 0, void 0, void 0, function* () {
        console.log("%s listening at 3001"); // eslint-disable-line no-console
        /* await setData();
        await setOffers();
        await setProposals();
        await setPortfolios();
        await setReview(); */
    }));
});