const express = require('express');
const sequelize = require('sequelize');
const cors = require('cors');
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

const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}


app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors(corsOptions));

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
