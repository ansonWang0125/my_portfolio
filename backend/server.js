const express = require('express');
const sequelize = require('sequelize');
const cors = require('cors');
const dotenv = require('dotenv');
require('dotenv').config();
const db = require('./Model')
const userRoutes = require('./Routes/userRoutes')
const articleRoutes = require('./Routes/articleRoutes')
const sessionRouter = require('./Routes/session.routes');

const PORT = process.env.PORT ||8080

const app = express();


app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors());

db.sequelize.sync().then(() => {    //drop table if exists
    console.log("db has been sync")
})

app.use('/api/users', userRoutes)
app.use('/api/article', articleRoutes)
app.use('/api/sessions', sessionRouter);

app.listen(PORT, () => console.log(`API is runing on ${PORT}`));
