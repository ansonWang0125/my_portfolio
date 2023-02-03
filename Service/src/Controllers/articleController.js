const db = require("../Model");
const { Client } = require('pg');
const Article = db.article;


const saveArticle = async (req, res) => {
    const client = new Client({
        host: process.env.host,
        user: process.env.user,
        database: process.env.databaseName,
        password: process.env.password,
        port: process.env.dbport
    });
    const query = `UPDATE "Articles" SET "titleState" = $1, "authorState" = $2, "time" = $3, "content" = $4, "title" = $5, "author" = $6 WHERE "id" = $7`
    try {
        const { id, title, author, time, content } = req.body; 
        console.log(req.body)
        await client.connect();
        await client.query(query, [ title, author, time, content, title.blocks[0].text, author.blocks[0].text, id])
        
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
        const { category, title, author, time, content } = req.body; 
        const user = req.user;
        const authorName = author.blocks[0].text
        const data = {
            category,
            title: title.blocks[0].text,
            titleState:title,
            author: authorName,
            authorState:author,
            time,
            content: content,
            userID: user.id,
            createTime: time,
            searchTimes: 0
        };
        const article = await Article.create(data);
        if (article !== null) {
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
    const updateQuery = `UPDATE "Articles" SET "searchTimes" = "searchTimes" + 1 WHERE "id" = $1` 
    const client = new Client({
        host: process.env.host,
        user: process.env.user,
        database: process.env.databaseName,
        password: process.env.password,
        port: process.env.dbport
    });
    try {
        const { id } = req.body; 
        await client.connect();
        await client.query(updateQuery, [id])
        const {rows} = await client.query(query, [id])
        return res.status(201).send({success:true,articlesInform:rows[0]});
    } catch (error) {
        console.log('postArticle error');
        console.log(error);
    } finally {
        client.end();
    }
}


const showArticle = async (req, res) => {
    const query = `SELECT "Articles"."id", "title", "author", "time", "Users"."authorName" FROM "Articles" LEFT JOIN "Users" ON "Users"."id" = "Articles"."userID" WHERE "category" = $1 `
    const client = new Client({
        host: process.env.host,
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
        console.log('showArticle error');
        console.log(error);
    } finally {
        client.end();
    }
}

const mainShowArticle = async (req, res) => {
    const newQuery = `SELECT "Articles"."id", "title", "author", "time", "createTime", "Users"."authorName", "searchTimes" FROM "Articles" LEFT JOIN "Users" ON "Users"."id" = "Articles"."userID" ORDER BY "createTime" DESC; `
    const hotQuery = `SELECT "Articles"."id", "title", "author", "time", "createTime", "Users"."authorName", "searchTimes" FROM "Articles" LEFT JOIN "Users" ON "Users"."id" = "Articles"."userID" ORDER BY "searchTimes" DESC; `
    const client = new Client({
        host: process.env.host,
        user: process.env.user,
        database: process.env.databaseName,
        password: process.env.password,
        port: process.env.dbport
    });
    try {
        const { value } = req.body; 
        await client.connect();
        const {rows} = value === 'new' ?await client.query(newQuery) : await client.query(hotQuery)
        if (rows.length > 0) {
            return res.status(201).send({success:true,articlesInform:rows});
        } else {
            return res.status(201).send({success:false,message:'NoArticle'});
        }
    } catch (error) {
        console.log('mainshowArticle error');
        console.log(error);
    } finally {
        client.end();
    }
}

const searchArticle = async (req, res) => {
    const query = `SELECT "Articles"."id", "title", "author", "time", "Users"."authorName" from "Articles" LEFT JOIN "Users" ON "Users"."id" = "Articles"."userID" WHERE "category" = $1 AND "title" LIKE $2 `
    const client = new Client({
        host: process.env.host,
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
        console.log('searchArticle error');
        console.log(error);
    } finally {
        client.end();
    }
}

const myShowArticle = async (req, res) => {
    const query = `SELECT "Articles"."id", "title", "author", "time", "Users"."authorName" FROM "Articles" LEFT JOIN "Users" ON "Users"."id" = "Articles"."userID" WHERE "Users"."id" = $1 `
    const client = new Client({
        host: process.env.host,
        user: process.env.user,
        database: process.env.databaseName,
        password: process.env.password,
        port: process.env.dbport
    });
    try {
        await client.connect();
        const {rows} = await client.query(query, [req.user.id])
        if (rows.length > 0) {
            return res.status(201).send({success:true,articlesInform:rows});
        } else {
            return res.status(201).send({success:false,message:'NoArticle'});
        }
    } catch (error) {
        console.log('showArticle error');
        console.log(error);
    } finally {
        client.end();
    }
}

const mySearchArticle = async (req, res) => {
    const query = `SELECT "Articles"."id", "title", "author", "time", "Users"."authorName" from "Articles" LEFT JOIN "Users" ON "Users"."id" = "Articles"."userID" WHERE "Users"."id" = $1 AND "title" LIKE $2 `
    const client = new Client({
        host: process.env.host,
        user: process.env.user,
        database: process.env.databaseName,
        password: process.env.password,
        port: process.env.dbport
    });
    try {
        const { searchStr } = req.body; 
        await client.connect();
        const {rows} = await client.query(query, [req.user.id, '%'+searchStr+'%'])
        if (rows.length > 0) {
            return res.status(201).send({success:true,articlesInform:rows});
        } else {
            return res.status(201).send({success:false,message:'Notfind'});
        }
    } catch (error) {
        console.log('searchArticle error');
        console.log(error);
    } finally {
        client.end();
    }
}
const deleteArticle = async (req, res) => {
    const checkQuery = `SELECT "id" FROM "Articles" WHERE "userID" = $1 `
    const client = new Client({
        host: process.env.host,
        user: process.env.user,
        database: process.env.databaseName,
        password: process.env.password,
        port: process.env.dbport
    });
    try {
        const { deleteList } = req.body; 
        await client.connect();
        const {rows} = await client.query(checkQuery, [req.user.id])
        const allArticles = rows.map(row => {return (row.id)})
        const valid = deleteList.every(val => allArticles.includes(val));
        if (valid){
            const query = `DELETE FROM "Articles" WHERE "id" IN (${deleteList})`
            const r = await client.query(query)
            return res.status(201).send({success:true});
        } else{
            return res.status(201).send({success:false,message:'Have Unvalid Article ID'});
        }
    } catch (error) {
        console.log('deleteArticle error');
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
    mainShowArticle,
    searchArticle,
    myShowArticle,
    mySearchArticle,
    deleteArticle,
};