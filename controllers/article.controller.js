const db = require('../utils/db');
// J'appelle un fichier créé qui tient le connexion MySQL.
// Le fichier "route" sert à lister les méthodes HTTP disponibles
// Le fichier "controller" contient les requêtes pour le CRUD des données

// Je créé des fonctions async qui appellent la base de données, et renvoie les données.
const getAll = async (length) => {
    // Je récupère tous les articles en BDD
    const [response, err] = await db.query("SELECT * FROM articles");
    const articles = [];
    for (let article of response) {
        
        articles.push(article);
    }
    return articles;
};

const getLastArticles = async (length) => {
    // Je récupère seulement 4 articles pour mon composant LastArticles
    const [response, err] = await db.query("SELECT * FROM articles ORDER BY id DESC LIMIT 4");
    const lastArticles = [];
    for (let lastArticle of response) {

        lastArticles.push(lastArticle);
    }
    return lastArticles;
};

const getById = async (id) => {
    // Je récupère un seul article par son id
    const [article, err] = await db.query("SELECT * FROM articles WHERE id = ?", [id]);
    if (!article) {
        return null;
    }
    return article[0];
};
// getById sert ici à récupérer un seul élément. Je retourne donc article[0], car MySQL répond
// toujours un array.

const add = async (data) => {
    // J'ajoute un article
    const [req, err] = await db.query("INSERT INTO articles (title, content, img, id_users, id_categories, created_at, updated_at) VALUES (?, ?, ?, ?, ?, now(), now())", [data.title, data.content, data.img, data.id_users, data.id_categories]);
    if (!req) {
        return null;
    }
    return getById(req.insertId);
};
// Une fois un article ajouté en base, j'appelle la fonction getById, créée plus haut, qui permet d'aller
// récupérer en base l'article nouvellement créé, sans réécrire la fonction "SELECT * FROM users"
// Je sécurise la requête avec (title, content, img, id_users, id_categories, created_at, updated_at) VALUES (?, ?, ?, ?, ?, now(), now()) ce qui me permet de gérer les injections SQL

const update = async (id, data) => {
// Pour update, je récupère d'abord l'article correspondant en utilisant la fonction getById
    const article = await getById(id);
    if (!article) {
        return null;
    } else {
        // je mets à jour, en réécrivant les champs potentiellement manquant, grace à l'article récupéré dans la constante article
        const [req, err] = await db.query("UPDATE articles SET title = ?, content = ?, img = ?, id_users = ?, id_categories = ? WHERE id = ? LIMIT 1", 
        [
            data.title || article.title, 
            data.content || article.content,
            data.img || article.img,
            data.id_users || article.id_users,
            data.id_categories || article.id_categories,
            id
        ]);

    return getById(id);
    } 
};

const remove = async (id) => {
    // Je supprime un article en l'ayant selectionné par son id, passé en paramètre de la fonction
    const [req, err] = await db.query("DELETE FROM articles WHERE id = ? LIMIT 1", [id]);
    if (!req) {
        return false;
    }
    return true;
};

// J'exporte toutes les fonctions pour pouvoir les rappeler dansun autre module
module.exports = {
    getAll,
    getLastArticles, 
    getById,
    add,
    update,
    remove
};