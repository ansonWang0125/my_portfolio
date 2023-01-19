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
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword)
        const data = {
            userName,
            password: hashedPassword,
        };
        const user = await User.create(data);
        if (user) {
            console.log("user", JSON.stringify(user,2));
            let userData = {userName: userName, password: hashedPassword, token:''}
            console.log('userData',userData);
            return res.status(201).send({success:true,userData});
        }else {
            return res.status(201).send({success:false,message:"Details are not correct"});
        }
    }catch (err) {
        console.log('signup error');
        console.log(err);
    }

}


const login = async (req, res) => {
    try {
        const {userName, password} = req.body;
        const user = await User.findOne({where: {userName: userName}});

        console.log(userName, password);


        if (user) {
            const isSame = await bcrypt.compare(password, user.password);
            if (isSame) {
                console.log("user", JSON.stringify(user,2));
                let token = jwt.sign({ id:user.id, iat: 1645869827, userName:userName}, process.env.secretKey, {   //用jwt來為使用者生成token, secretKey是用來為jtw加密
                    expiresIn: 1 *24 * 60 * 60 * 1000       //expiresIn 是設定有效期限
                    })
                return res.status(201).send({success:true, token: token});
            } else {
                return res.status(201).send({success:false, message: 'Password incorrect'});
            }
        }else {
            console.log('Can not find')
            return res.status(201).send({success:false, message:'User name not found'});
        }
    }catch (err) {
        console.log('login error');
        console.log(err);
    }
}

module.exports = {
    signup,
    login
};
