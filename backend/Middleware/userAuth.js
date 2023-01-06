const express = require('express');
const db = require("../Model");
require('dotenv').config()

const User = db.users;

const saveUser = async (req, res, next) => {
    try {
        const userName = await User.findOne({
            where: {
                userName: req.body.userName,
            },
        });
        if (userName) {
            return res.status(201).send({success:false,message:"username already exists"});
        }

        next();
    } catch (error) {
        console.log('saveUser error');
        console.log(error);
    }
};

const checkToken = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer', '')
        const decoded = jwt.verify(token, process.env.secretKey)
        const user = await User.findOne({
            where: {
                userName: decoded.userName,
                id: decoded.id
            },
        });
        if (!user) { throw new Error() }
        req.token = token
        req.user = user

        next();
    } catch (error) {
        console.log('saveUser error');
        console.log(error);
        res.status(401).send({ error: 'Please authenticate.' });
    }
};

module.exports = {
    saveUser,
    checkToken
};