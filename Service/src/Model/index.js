//importing modules
const {Sequelize, DataTypes} = require('sequelize')
require('dotenv').config()

console.log(process.env.dbport)

    // const sequelize = new Sequelize(`postgres://${process.env.user}:${process.env.password}@127.0.0.1:${process.env.dbport}/${process.env.databaseName}`, {dialect: process.env.database})
    const sequelize = new Sequelize(process.env.url, {dialect: process.env.database})
    //checking if connection is done
        sequelize.authenticate().then(() => {
            console.log(`Database connected to discover`)
        }).catch((err) => {
            console.log(err)
        })

        const db = {}
        db.Sequelize = Sequelize
        db.sequelize = sequelize

    //connecting to model
    db.users = require('./userModel') (sequelize, DataTypes)
    db.article = require('./articleModel') (sequelize, DataTypes)
    db.image = require('./imageModel') (sequelize, DataTypes)
    db.users.hasMany(db.article, {foreignKey: "userID", targetKey: "id", onDelete: 'cascade'})
    db.article.hasMany(db.image, {foreignKey: "articleID", targetKey: "id", onDelete: 'cascade'})

//exporting the module
module.exports = db 
//new Sequelize(`postgres://${process.env.user}:${process.env.password}@127.0.0.1:${process.env.dbport}/${process.env.databaseName}`, {dialect: process.env.database})