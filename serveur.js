let http = require("http");
let url = require("url");
const fs = require("fs");

const gestionPage = require("./gestionPage");

const PORT = "8080";

let serveur = http.createServer(traitReq);
serveur.listen(PORT);

function traitReq(requete, reponse) {
  let monObj = url.parse(requete.url);

  if (monObj.pathname === "/") {
    monObj.pathname = "/index.html";
  }

  if (monObj.pathname !== "/favicon.ico") {
    var dataPreparation = gestionPage.preparerLesDonnees(monObj);
    let data = {};

    data.contentType = dataPreparation.contentType;
    data.pageHtml = fs.readFileSync(
      dataPreparation.dossier + dataPreparation.fichier,
      dataPreparation.encodage
    );

    gestionPage.envoyerLeDonnees(reponse, data);
  }
}
