const express = require('express');
const sequelize = require('sequelize');
const dotenv = require('dotenv');
require('dotenv').config();
const db = require('./Model')
const userRoutes = require('./Routes/userRoutes')
const articleRoutes = require('./Routes/articleRoutes')
const sessionRouter = require('./Routes/session.routes');
const path = require('path')
const http = require('http')


const PORT = process.env.PORT ||10000

const app = express();

// Add headers before the routes are defined
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'https://post-articles.onrender.com/*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});


app.use(express.json())
app.use(express.urlencoded({ extended: false }))

db.sequelize.sync().then(() => {    //drop table if exists
    console.log("db has been sync")
})


app.use('/api/users', userRoutes)
app.use('/api/article', articleRoutes)
app.use('/api/sessions', sessionRouter);


app.use(express.static(path.join(__dirname, "..", "..", "UI", "build")));
app.get("/*", (_, res) => {
  res.sendFile(path.join(__dirname,"..","..", "UI", "build", "index.html"));
});



const address = 'localhost'
const httpServer = http.createServer(app);
httpServer.listen(PORT, address, () => {
  console.log(`🚀 Server Ready at ${address}:${PORT}! 🚀`)
});
