const express = require('express');
const db = require("../Model");
require('dotenv').config()
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library")

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
        const token = req.header('Authorization').replace('Bearer ', '')
        console.log('token=',token)
        const decoded = jwt.verify(token, process.env.secretKey)
        console.log('decoded id =',decoded.id)
        console.log('decoded user =', decoded.userName)
        const user = await User.findOne({
            id: decoded.id,
            userName: decoded.userName,
        });
        if (user) { console.log('find')}
        else { throw new Error() }
        req.token = token
        req.user = user

        next();
    } catch (error) {
        console.log('checkUser error');
        console.log(error);
        res.status(401).send({ error: 'Please authenticate.' });
    }
};


const googleAuth = async (req, res, next) => {
    const GOOGLE_CLIENT_ID = process.env.CLIENT_ID;
    const client = new OAuth2Client(GOOGLE_CLIENT_ID);

    async function verifyGoogleToken(token) {
        try {
          const ticket = await client.verifyIdToken({
            idToken: token,
            audience: GOOGLE_CLIENT_ID,
          });
          return { payload: ticket.getPayload() };
        } catch (error) {
          return { error: "Invalid user detected. Please try again" };
        }
    }
    try {
        if (req.body.credential) {
            const verificationResponse = await verifyGoogleToken(req.body.credential);
    
            if (verificationResponse.error) {
            return res.status(200).json({
                success:false,message: verificationResponse.error,
            });
            }
            const profile = verificationResponse?.payload;
            req.profile = profile
            console.log(profile);
        }
    } catch (error) {
        res.status(200).json({
          success:false,message: "An error occurred. Registration failed.",
        });
    }
}

module.exports = {
    saveUser,
    checkToken,
    googleAuth
};