// j'appelle les paquets npm

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// J'appelle mon fichier config contenant les paramètres de mon serveur

const config = require('./config');

const routes = require('./routes');

// je crée mon serveur
const app = express();

// J'applique mes middlewares
app.use(morgan('dev'));
// morgan : pour les logs dans la console

app.use(cors());
// cors : pour gérer les en-têtes HTTP
// (https://developer.mozilla.org/fr/docs/Glossary/CORS)

app.use(express.json());
// JSON du pack express pour permettre à Express de parser le json envoyé de le corps des requêtes

// j'applique mon router (situé dans routes/index.js) sur l'adresse
// "/api". Toutes mes routes seront donc de la forme : 
// "http://localhost/api/{entité}" etc ... --> restfull
app.use(config.basePath, routes);

// Je demande à mon serveur Express d'écouter le port 8080 pour fonctionner
// (port HTTP par défaut).
app.listen(config.port, () => {
    console.log("Server up on port " + config.port);
});

