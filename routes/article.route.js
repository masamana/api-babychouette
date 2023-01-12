// Le fichier "route" sert à lister les méthodes HTTP disponibles

const express = require('express');
//  Je déclare les constantes que je vais avoir besoin d'appeler dans les méthodes
// Cela me permettra d'appeler les fonctions que je veux utiliser

const articleController = require('../controllers/article.controller');
// Pour les requêtes SQL
const articleSchema = require('../models/article');
const validator = require('../utils/validator');
// Pour le format d'entrée des données
const auth = require('../utils/auth');
// Pour sécuriser l'accès aux données

const router = express.Router();

// Je déclare toutes les méthodes HTTP disponibles pour chaque route :
// GET et POST sur '/' (soit "http://localhost/api/articles/")

router.route('/')
// Pour le GET, je récupère tous les articles grâce à ma fonction getAll que j'appelle
    .get(async(req, res) => {
        const articles = await articleController.getAll()
        if(!articles) {
            res.status(404).json();
        }
        res.status(200).json(articles)
    })

// Pour POST, j'utilise une méthode de validation avec Joi afin de valider les données d'entrée
// Je spécifie aussi cette action du CRUD (ici Create) à l'admin seulement avec le middleware auth
// et la fonction IsAdmin
// J'ajoute le middleware pour empêcher l'accès aux non admin 
// Cette fonction récupère le jwt et vérifie la validation de celui-ci ainsi que le rôle du user
    .post(validator(articleSchema), auth.isAdmin(), async (req, res) => {
        const new_article = await articleController.add(req.body);

        if (!new_article) {
            res.status(404).json();
        }
        res.status(201).json("L'article a été ajouté avec succès !");
    })
;

router.route('/last-articles')

    .get(async(req, res) => {
        const lastArticles = await articleController.getLastArticles();
        if(!lastArticles) {
            res.status(404).json("Pas d'articles");
        }
        res.status(200).json(lastArticles)
    })
;

router.route('/:id')

    .get(async (req, res) => {
        const article = await articleController.getById(req.params.id);
        
        if (!article) {
            res.status(404).json("L'article demandé n'existe pas.")
        }
        res.status(200).json(article)
    })

    // .put( async (req, res) => {
    //     const new_article = await articleController.update(req.params.id, req.body);

    //     if (!new_article) {
    //         res.status(404).json();
    //     }
    //     res.status(201).json(new_article);
    // })
    // en rajoutant un PUT en réutilisant ma fonction update, l'app plante, à modifier et chercher pourquoi

    .patch(auth.isAdmin(), async (req, res) => {
        const article = await articleController.update(req.params.id, req.body);
        
        if (!article) {
            res.status(404).json("L'article demandé n'existe pas.");
        }
        res.status(202).json(article);
    })
    //j'ajoute le middleware pour empêcher l'accès aux non admin 
    //ici je fait un patch car je veux laisser le choix de modifier partiellement l'article, je retire le schemaValidator de mon article 

    .delete(auth.isAdmin(), async (req, res) => {
        const article = await articleController.remove(req.params.id);
        
        if (!article) {
            res.status(404).json("L'article demandé n'existe pas.");
        }
        res.status(202).json("L'article selectionné a bien été supprimé.")
    })
;

// Je chaîne les méthodes, il n'y a pas de ";" après chaque méthode mais à la fin de chaque route :
//  router.route('/').get().put();
//  router.route('/:id').get().patch().delete();

module.exports = router;