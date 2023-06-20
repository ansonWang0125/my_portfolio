const express = require('express');
const { Client } = require('pg');
require('dotenv').config()


const saveArticle = async (req, res, next) => {
    const client = new Client({
        host: process.env.host,
        user: process.env.user,
        database: process.env.databaseName,
        password: process.env.password,
        port: process.env.dbport,
        ssl: true
    });
    console.log(req.body)
    const query = `SELECT * FROM "Articles" WHERE "title" = $1 AND "author" = $2 AND "id" != $3` 
    try {
        await client.connect();
        const {rows} = await client.query(query, [ req.body.title.blocks[0].text, req.body.author.blocks[0].text, req.body.id])
        
        if (rows.length > 0) {
            return res.status(201).send({success:false,message:"Article Title already exists"});
        }

        next();
    } catch (error) {
        console.log('saveArticles error');
        console.log(error);
    } finally {
        client.end();
    }
};

const createArticle = async (req, res, next) => {
    const client = new Client({
        host: process.env.host,
        user: process.env.user,
        database: process.env.databaseName,
        password: process.env.password,
        port: process.env.dbport,
        ssl: true
    });
    console.log(req.body)
    const query = `SELECT * FROM "Articles" WHERE "title" = $1 AND "author" = $2 ` 
    try {
        await client.connect();
        const {rows} = await client.query(query, [req.body.title.blocks[0].text, req.body.author.blocks[0].text])
        
        if (rows.length > 0) {
            return res.status(201).send({success:false,message:"Article already exists"});
        }

        next();
    } catch (error) {
        console.log('create Articles error');
        console.log(error);
    } finally {
        client.end();
    }
};

module.exports = {
    saveArticle,
    createArticle
};