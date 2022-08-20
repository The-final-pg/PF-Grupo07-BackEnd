import server from "./src/app";
const { conn } = require("./src/db");
import {
  setData,
  setOffers,
  setProposals,
  setPortfolios,
  setReview,
} from "./data";
import { cleanDataBase } from './src/services/cleanDataBase'
/* const setData =require('./data');
const setOffersAndProposals =require('./data'); */

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, async () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console
    await setData();
    await setOffers();
    await setProposals();
    await setPortfolios();
    await setReview();
    cleanDataBase();
  });
});
