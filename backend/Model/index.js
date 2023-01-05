//importing modules
const {Sequelize, DataTypes} = require('sequelize')
require('dotenv').config()

console.log(process.env.dbport)

module.exports = db = {}

initialize();

async function initialize() {
    const sequelize = new Sequelize(`postgres://${process.env.user}:${process.env.password}@127.0.0.1:${process.env.dbport}/${process.env.databaseName}`, {dialect: process.env.database})

    //checking if connection is done
        sequelize.authenticate().then(() => {
            console.log(`Database connected to discover`)
        }).catch((err) => {
            console.log(err)
        })

        db.Sequelize = Sequelize
        db.sequelize = sequelize

    //connecting to model
    db.users = require('./userModel') (sequelize, DataTypes)

}

//exporting the module