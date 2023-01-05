const bcrypt = require("bcrypt");
const db = require("../Model");
require('dotenv').config()

const jwt = require("jsonwebtoken");

const User = db.users;

const signup = async (req, res) => {
    try {
        console.log('signup')
        const { userName, password } = req.body;
        console.log(userName, password);
        const hashedPassword = await bcrypt.hash(password, 10)
        const data = {
            userName,
            token: 'undefined'
        };
        const user = await User.create(data);
        if (user) {
            user.update(
                {token: jwt.sign({ id:user.id, iat: 1645869827}, process.env.secretKey+hashedPassword, {   //用jwt來為使用者生成token, secretKey是用來為jtw加密
                    expiresIn: 1 *24 * 60 * 60 * 1000       //expiresIn 是設定有效期限
                    })},
                {where: {userName: userName}}
            )
            console.log("user", JSON.stringify(user,2));
            userData = {userName: userName, password:password, token:user.token}
            console.log('userData',userData);
            return res.status(201).send({success:true,userData});
        }else {
            message = {message: "Details are not correct"}
            return res.status(409).send({success:false,message});
        }
    }catch (err) {
        console.log('signup error');
        console.log(err);
    }

}

const withToken = async (req, res) => {
    try {
        const userName = req.body;
        const token = req.header('Authorization').replace('Bearer ', '');

        console.log(userName, token);
        console.log(userName.username)

        const user = await User.findOne({where:{userName: userName.username}});

        if (user) {
            console.log(user.userName)
            console.log('header token',token)
            console.log('user token',user.token)
            const isSame = token === user.token;
            if (isSame) {
                console.log("user", JSON.stringify(user,2));
                console.log(token);
                return res.status(201).send({isSame});
            } else {
                return res.status(201).send(!{isSame});
            }
        }else {
            console.log('Can not find')
            return res.status(201).send(false);
        }
    }catch (err) {
        console.log('login error');
        console.log(err);
    }
}

const withoutToken = async (req, res) => {
    try {
        const {userName, password} = req.body;
        console.log(userName, password);
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.findOne({userName});
        const token = jwt.sign({ id:user.id, iat: 1645869827}, process.env.secretKey+hashedPassword, {   //用jwt來為使用者生成token, secretKey是用來為jtw加密
            expiresIn: 1 *24 * 60 * 60 * 1000       //expiresIn 是設定有效期限
            })

        console.log(userName, password);


        if (user) {
            console.log('header token',token)
            console.log('user token',user.token)
            const isSame = token === user.token;
            if (isSame) {
                console.log("user", JSON.stringify(user,2));
                console.log(token);
                return res.status(201).send({isSame});
            } else {
                return res.status(201).send(!{isSame});
            }
        }else {
            console.log('Can not find')
            return res.status(201).send(false);
        }
    }catch (err) {
        console.log('login error');
        console.log(err);
    }
}


const login = async (req, res) => {
    console.log(req.header('Authorization'))
    if (req.header('Authorization') !== undefined ){
        console.log('token')
        withToken(req, res) }
    else {
        console.log('without token');
        withoutToken(req, res)
    }
}

module.exports = {
    signup,
    login
};
