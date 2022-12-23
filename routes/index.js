const express = require('express');
// J'importe ici tous les fichiers "route" contenus dans le 
// dossier "routes"

const userRoute = require('./user.route');
const articleRoute = require('./article.route');
const signUpRoute = require('./signup.route');
const loginRoute = require('./login.route');
//const childRoute = require('./child.route');
//const categorieRoute = require('./categorie.route');


// Comme sur app.js, j'appelle le router de Express.
const router = express.Router();

// ... et je pointe chaque entité vers la bonne sous-route.
// Ici, les routes contenues dans le fichier user.route.js pointeront vers /users
// "http://localhost/api/users"

router.use('/users', userRoute);
router.use('/articles', articleRoute);
router.use('/login', loginRoute);
router.use('/signup', signUpRoute);
// router.use('/children', childRoute);
// router.use('/categories', categorieRoute);


// J'exporte le router pour le rendre accessible en faisant un 
// require de ce fichier.
// Dans app.js, lorsque je fais "const router = require('./routes')",
// "router" vaut ce qui est renseigné dans ce "module.exports"
module.exports = router;