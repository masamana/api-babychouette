const db = require('../utils/db');

const getAll = async (length) => {
    const [response, err] = await db.query("SELECT * FROM articles");
    const articles = [];
    for (let article of response) {
        
        articles.push(article);
    }
    return articles;
};

const getLastArticles = async (length) => {
    const [response, err] = await db.query("SELECT * FROM articles LIMIT 4");
    const lastArticles = [];
    for (let lastArticle of response) {

        lastArticles.push(lastArticle);
    }
    return lastArticles;
};

const getById = async (id) => {
    const [article, err] = await db.query("SELECT * FROM articles WHERE id = ?", [id]);
    if (!article) {
        return null;
    }
    return article[0];
};


const add = async (data) => {

    const [req, err] = await db.query("INSERT INTO articles (title, content, img, id_users, id_categories, created_at, updated_at) VALUES (?, ?, ?, ?, ?, now(), now())", [data.title, data.content, data.img, data.id_users, data.id_categories]);
    if (!req) {
        return null;
    }
    return getById(req.insertId);

};

const update = async (id, data) => {
    const article = await getById(id);
    if (!article) {
        return null;
    } else {
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
    const [req, err] = await db.query("DELETE FROM articles WHERE id = ? LIMIT 1", [id]);
    if (!req) {
        return false;
    }
    return true;
};



module.exports = {
    getAll,
    getLastArticles, 
    getById,
    add,
    update,
    remove
};