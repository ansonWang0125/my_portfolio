require('dotenv').config()
const { Client } = require('pg');
const { jsonToSQL } = require("../migrations/manualSQL")

const showData = async (req, res) => {
    const client = new Client({
        host: process.env.host,
        user: process.env.user,
        database: process.env.databaseName,
        password: process.env.password,
        port: process.env.dbport,
        ssl: true
    });
    try {
        // console.log('show data', req.body)
        const articleQuery = `SELECT "Articles"."id", "title", "author", "time", "category", "createTime", "Users"."authorName", "searchTimes" FROM "Articles" LEFT JOIN "Users" ON "Users"."id" = "Articles"."userID" ; `
        const imagesQuery = `SELECT "Images"."id", "articleID", "originalname", "Articles"."title" FROM "Images" LEFT JOIN "Articles" ON "Articles"."id" = "Images"."articleID" ; `
        const usersQuery = `SELECT "id", "userName", "email", "googleName", "role", "verified", "authorName" FROM "Users"; `
        const query = req.body.type === 'Articles' ? articleQuery : req.body.type === 'Images' ? imagesQuery : usersQuery
        await client.connect();
        const {rows} = await client.query(query)
        // console.log(rows)
        if (rows.length > 0) {
            return res.status(201).send({success:true,inform:rows});
        } else {
            return res.status(201).send({success:false,message:'NoResult'});
        }
    }catch (err) {
        console.log('show data error');
        console.log(err);
    }finally {
        client.end();
    }

}

const deleteData = async (req, res) => {
    const checkArticleQuery = `SELECT "id" FROM "Articles"  `
    const checkImageQuery = `SELECT "id" FROM "Images"  `
    const checkUserQuery = `SELECT "id" FROM "Users"  `
    const client = new Client({
        host: process.env.host,
        user: process.env.user,
        database: process.env.databaseName,
        password: process.env.password,
        port: process.env.dbport,
        ssl: true
    });
    try {
        const { deleteList } = req.body; 
        await client.connect();
        const checkQuery = req.body.type === 'Articles' ? checkArticleQuery : req.body.type === 'Images' ? checkImageQuery : checkUserQuery
        const {rows} = await client.query(checkQuery)
        const allData = rows.map(row => {return (row.id)})
        const valid = deleteList.every(val => allData.includes(val));
        if (valid){
            const deleteArticleQuery = `DELETE FROM "Articles" WHERE "id" IN (${deleteList})`
            const deleteImageQuery = `DELETE FROM "Images" WHERE "id" IN (${deleteList})`
            const deleteUserQuery = `DELETE FROM "Users" WHERE "id" IN (${deleteList})`
            const query = req.body.type === 'Articles' ? deleteArticleQuery : req.body.type === 'Images' ? deleteImageQuery : deleteUserQuery
            await client.query(query)
            return res.status(201).send({success:true});
        } else{
            return res.status(201).send({success:false,message:'Have Unvalid ID'});
        }
    } catch (error) {
        console.log('deleteArticle error');
        console.log(error);
    } finally {
        client.end();
    }

}

const getAllData = async (req, res) => {
    const client = new Client({
        host: process.env.host,
        user: process.env.user,
        database: process.env.databaseName,
        password: process.env.password,
        port: process.env.dbport,
        ssl: true
    });
    try {
        const articleQuery = `SELECT * FROM "Articles" ; `
        const usersQuery = `SELECT * FROM "Users"; `
        await client.connect();
        const articles = await client.query(articleQuery)
        const users = await client.query(usersQuery)
        return res.status(201).send({success:true,articles:articles.rows, users:users.rows});
    }catch (err) {
        console.log('get data error');
        console.log(err);
    }finally {
        client.end();
    }

}

const createData = async (req, res) => {
    const client = new Client({
        host: process.env.host,
        user: process.env.user,
        database: process.env.databaseName,
        password: process.env.password,
        port: process.env.dbport,
        ssl: true
    });
    try {
        const sql = jsonToSQL()
        const query = sql
        await client.connect();
        await client.query(query)
        return res.status(201).send({success:true});
    }catch (err) {
        console.log('create data error');
        console.log(err);
    }finally {
        client.end();
    }

}

module.exports = {
    showData,
    deleteData,
    getAllData,
    createData,
}