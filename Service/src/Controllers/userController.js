const bcrypt = require("bcrypt");
const db = require("../Model");
require('dotenv').config()

const jwt = require("jsonwebtoken");

const Op = db.Sequelize.Op

const User = db.users;

const signup = async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const data = {
            userName,
            email,
            password: hashedPassword,
            role: 'user',
            authorName: userName
        };
        const isRoot = (userName === process.env.rootName && email === process.env.rootEmail && password === process.env.rootPassword)
        if (  isRoot ) {
            data.role = 'root';
        }
        console.log(data)
        const user = await User.create(data);
        if (user !== null) {
            let userData = {userName: userName, email: email, password: hashedPassword, token:''}
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
        const {userData, password} = req.body;
        const user = await User.findOne({
            where: {
                [Op.or]: [{userName: userData}, {email: userData}]
            }});

        if (user !== null ) {
            const isSame = await bcrypt.compare(password, user.password);
            if (isSame) {
                let token = jwt.sign({ id:user.id, iat: 1645869827, userEmail:user.email}, process.env.secretKey, {   //用jwt來為使用者生成token, secretKey是用來為jtw加密
                    expiresIn: 1 *24 * 60 * 60 * 1000       //expiresIn 是設定有效期限
                    })
                console.log(user.role)
                const isRoot = user.role === 'root'
                return res.status(201).send({success:true, token: token, root:isRoot});
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

const account = async (req, res) => {
    try {
        const user = req.user
        const data = {authorName: user.authorName, userName: user.userName, email: user.email}
        return res.status(201).send({success:true, data:data})
    }catch (err) {
        console.log('account error');
        console.log(err);
    }
}

const update = async (req, res) => {
    try {
        const user = req.user
        const {authorName, userName, email} = req.body
        const changeEmail = email !== user.email
        const changeUserName = userName !== user.userName
        const changeAuthorName = authorName !== user.authorName
        const data = {
            userName: userName,
            email: email,
            authorName: authorName
          };
        const sameEmailUser = await User.findOne({
            where: {
                email: email
            }
        });
        const sameNameUser = await User.findOne({
            where: {
                userName: userName
            }
        });
        const sameNameAuthor = await User.findOne({
            where: {
                authorName: authorName
            }
        });
        if ((!changeEmail ||(changeEmail && sameEmailUser === null)) && (!changeUserName || (changeUserName && sameNameUser === null)) && (!changeAuthorName || (changeAuthorName && sameNameAuthor === null))) {
            User.update(data, {where: {email: user.email}});
            return res.status(201).send({success:true, data:data})
        }else if (changeEmail && sameEmailUser !== null){
            return res.status(201).send({success:false, message:'This account has been used'})
        }else if (changeUserName && sameNameUser !== null){
            return res.status(201).send({success:false, message:'This user name has been used'})
        }else if (changeAuthorName && sameNameAuthor !== null){
            return res.status(201).send({success:false, message:'This author name has been used'})
        }
    }catch (err) {
        console.log('update error');
        console.log(err);
    }
}

module.exports = {
    signup,
    login,
    account,
    update
};
