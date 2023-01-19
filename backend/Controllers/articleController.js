const db = require("../Model");
const { Client } = require('pg');
const Article = db.article;


const saveArticle = async (req, res) => {
    const client = new Client({
        host: '127.0.0.1',
        user: process.env.user,
        database: process.env.databaseName,
        password: process.env.password,
        port: process.env.dbport
    });
    const query = `UPDATE "Articles" SET "titleState" = $1, "authorState" = $2, "time" = $3, "content" = $4 WHERE "id" = $5`
    try {
        const { id, title, author, time, content } = req.body; 
        console.log(req.body)
        await client.connect();
        await client.query(query, [ title, author, time, content, id])
        
        return res.status(201).send({success:true,message:"Success!"});
    } catch (error) {
        console.log('updateArticle error');
        console.log(error);
    } finally {
        client.end();
    }
}
const createArticle = async (req, res) => {
    console.log(req.body)
    try{
        const { category, title, author, time, contentState, user } = req.body; 
        const data = {
            category,
            title: title.blocks[0].text,
            titleState:title,
            author: author.blocks[0].text,
            authorState:author,
            time,
            content: contentState,
            id: user.id
        };
        const article = await Article.create(data);
        if (article) {
            console.log("user", JSON.stringify(article,2));
            let articleInform = {id: article.id}
            console.log('articleInform',articleInform);
            return res.status(201).send({success:true,articleInform});
        }else {
            return res.status(201).send({success:false,message:"Something went wrong"});
        }
    }catch (err) {
        console.log('create article error');
        console.log(err);
    }
}

const postArticle = async (req, res) => {
    const query = `SELECT "titleState", "authorState", "time", "content" from "Articles" WHERE "id" = $1`
    const client = new Client({
        host: '127.0.0.1',
        user: process.env.user,
        database: process.env.databaseName,
        password: process.env.password,
        port: process.env.dbport
    });
    try {
        const { id } = req.body; 
        await client.connect();
        const {rows} = await client.query(query, [id])
        return res.status(201).send({success:true,articlesInform:rows[0]});
    } catch (error) {
        console.log('saveArticle error');
        console.log(error);
    } finally {
        client.end();
    }
}


const showArticle = async (req, res) => {
    const query = `SELECT "id", "title", "author", "time" from "Articles" WHERE "category" = $1`
    const client = new Client({
        host: '127.0.0.1',
        user: process.env.user,
        database: process.env.databaseName,
        password: process.env.password,
        port: process.env.dbport
    });
    try {
        const { category } = req.body; 
        await client.connect();
        const {rows} = await client.query(query, [category])
        if (rows.length > 0) {
            return res.status(201).send({success:true,articlesInform:rows});
        } else {
            return res.status(201).send({success:false,message:'NoArticle'});
        }
    } catch (error) {
        console.log('saveArticle error');
        console.log(error);
    } finally {
        client.end();
    }
}

const searchArticle = async (req, res) => {
    const query = `SELECT "id", "title", "author", "time" from "Articles" WHERE "category" = $1 AND "title" LIKE $2 `
    const client = new Client({
        host: '127.0.0.1',
        user: process.env.user,
        database: process.env.databaseName,
        password: process.env.password,
        port: process.env.dbport
    });
    try {
        const { category, searchStr } = req.body; 
        await client.connect();
        const {rows} = await client.query(query, [category, '%'+searchStr+'%'])
        if (rows.length > 0) {
            return res.status(201).send({success:true,articlesInform:rows});
        } else {
            return res.status(201).send({success:false,message:'Notfind'});
        }
    } catch (error) {
        console.log('saveArticle error');
        console.log(error);
    } finally {
        client.end();
    }
}
module.exports = {
    saveArticle,
    createArticle,
    postArticle,
    showArticle,
    searchArticle
};