const config = require('../config');
const jwt = require('jsonwebtoken');

const isAuth = () => {
    return (req, res, next) => {
        const header = req.headers.authorization;
        
        if (!header) {
            res.status(401).json({message: "Vous devez être connecté"});
        }

        const access_token = header.split(" ")[1];


        jwt.verify(access_token, config.jwtPass, (err, decodedToken) => {
            if (err) {
                res.status(401).json({message: "JWT invalide"});
            } else if (decodedToken.roles === 'user') {
                next();
            } else {
                res.status(401).json({message: "Vous devez être user"});
            }
        });
    }
};

const isAdmin = () => {
    return (req, res, next) => {
        const header = req.headers.authorization;
        // Je récupère les paramètres de connexion
        if (!header) {
            res.status(401).json({message: "Vous devez être connecté"});
        }
        // S'il n'y a pas de connexion, j'envoie un msg d'erreur
        
        const access_token = header.split(" ")[1];
        // S'il y a une connexion, je récupère le jwt
        jwt.verify(access_token, config.jwtPass, (err, decodedToken) => {
        // Je vérifie sa validité
            if (err) {
                res.status(401).json({message: "JWT invalide"});
                // S'il est valide, je vérifie maintenant le rôle associé au jwt de connexion
            } else if (decodedToken.roles === 'admin') {
                next();
                // S'il est 'admin', on passe à la suite, sinon le else s'exécute
                // et indique le msg d'erreur suivant
            } else {
                res.status(401).json({message: "Vous devez être administrateur"});
            }
        });
    }
};

module.exports =  {
    isAuth,
    isAdmin
}