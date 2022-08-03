"use strict";
const  app = require('./src/app');
const { conn } = require('./src/db');
// Syncing all the models at once.
conn.sync({ force: true }).then(async () => {
   await app.listen(process.env.PORT || 3001, () => {
        console.log("app", app)
        console.log("%s listening at 3001"); // eslint-disable-line no-console
    });
});
 