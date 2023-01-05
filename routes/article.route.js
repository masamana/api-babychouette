const express = require('express');

const articleController = require('../controllers/article.controller');
const articleSchema = require('../models/article');
const validator = require('../utils/validator');
const auth = require('../utils/auth');



const router = express.Router();

router.route('/')

    .get(async(req, res) => {
        const articles = await articleController.getAll()
        if(!articles) {
            res.status(404).json();
        }
        res.status(200).json(articles)
    })

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
    // j'ajoute le middleware pour empêcher l'accès aux non admin 
    //ici je fait un patch car je veux laisser le choix de modifier partiellement l'article, je retire le schemaValidator de mon article 

    .delete(auth.isAdmin(), async (req, res) => {
        const article = await articleController.remove(req.params.id);
        
        if (!article) {
            res.status(404).json("L'article demandé n'existe pas.");
        }
        res.status(202).json("L'article selectionné a bien été supprimé.")
    })
;



    module.exports = router;