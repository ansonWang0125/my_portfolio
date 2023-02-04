const sequelize = require('sequelize');
const dotenv = require('dotenv');
require('dotenv').config();
const db = require('./Model')
const envRoutes = require('./Routes/envRoutes')
const imageRoutes = require('./Routes/imageRoutes')
const userRoutes = require('./Routes/userRoutes')
const articleRoutes = require('./Routes/articleRoutes')
const sessionRouter = require('./Routes/session.routes');
const path = require('path')
const http = require('http')
// const { setHeader } = require('./utils/setHeader')


const PORT = process.env.PORT ||10000

const express = require("express");
const app = express();
const cors = require('cors');
app.use(cors());


app.use(express.json())
app.use(express.urlencoded({ extended: false }))

db.sequelize.sync().then(() => {    //drop table if exists
    console.log("db has been sync")
})

app.use('/api/env', envRoutes)
app.use('api/image', imageRoutes)
app.use('/api/users', userRoutes)
app.use('/api/article', articleRoutes)
app.use('/api/sessions', sessionRouter);


app.use(express.static(path.join(__dirname, "..", "..", "UI", "build")));
app.get("/*", (_, res) => {
  res.sendFile(path.join(__dirname,"..","..", "UI", "build", "index.html"));
});

app.listen(PORT, function(err){ 
  if (err) console.log("Error in server setup") 
  console.log("Server listening on Port", PORT); 
})

// const httpServer = http.createServer(app);
// httpServer.listen(PORT, () => {
//   console.log(`🚀 Server Ready at ${PORT}! 🚀`)
// });
