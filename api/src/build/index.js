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
const server = require("./src/app");
const { conn } = require("./src/db");
const data_1 = require("./data");
/* const setData =require('./data');
const setOffersAndProposals =require('./data'); */
// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
    server.listen(3001, () => __awaiter(void 0, void 0, void 0, function* () {
        console.log("%s listening at 3001"); // eslint-disable-line no-console
        yield (0, data_1.setData)();
        yield (0, data_1.setOffers)();
        yield (0, data_1.setProposals)();
        yield (0, data_1.setPortfolios)();
        yield (0, data_1.setReview)();
    }));
});
