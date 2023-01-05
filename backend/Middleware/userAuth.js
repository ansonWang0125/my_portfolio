const express = require('express');
const db = require("../Model");

const User = db.users;

const saveUser = async (req, res, next) => {
    try {
        const userName = await User.findOne({
            where: {
                userName: req.body.userName,
            },
        });
        if (userName) {
            message = {message:"username already exists"}
            return res.status(409).send({success:false,message});
        }

        next();
    } catch (error) {
        console.log('saveUser error');
        console.log(error);
    }
};

module.exports = {
    saveUser
};