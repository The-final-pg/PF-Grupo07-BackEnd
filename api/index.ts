/* const server = require('./src/app');
const { conn } = require('./src/db');

// Syncing all the models at once.
conn.sync({ force: true}).then(() => {
  server.listen(process.env.PORT || 3001, () => {
    console.log("as",server)
    console.log("%s listening at 3001"); // eslint-disable-line no-console
  });
}); */

import server from "./src/app";
const { conn } = require('./src/db');


  //Genera la conexión en el puerto establecida en db.ts
  // Se le pasa un parámetro como true o false. Si es true, borra la DB e inserta una nueva.
  // Si es false, no hace nada, sólo se conecta.
   conn.sync({ force: true }).then(async () => {
    await server.listen(process.env.PORT || 3001, () => {
         console.log("app", server)
         console.log("%s listening at 3001"); // eslint-disable-line no-console
     }); 
     console.log("levanto el server en el 3001")
   })