import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import http from "http";
import router from './backend/router.js';
import { connectMongo } from './backend/db.js'

const app = express();

// init middleware
app.use(cors());

// define routes
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', router);
app.use('/api/getReplies', router);
app.use('/api/getWishes', router);
app.use('/api/addReplies', router);
app.use('/api/addWishes', router);
app.use('/api/deleteReplies', router);
app.use('/api/deleteWishes', router);

app.use(express.static(path.join(__dirname, "frontend", "build")));
app.get("/*", (_, res) => {
  res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});

connectMongo();

// define server
const port = process.env.PORT || 4000;
const address = '0.0.0.0'
const httpServer = http.createServer(app);
httpServer.listen(port, address, () => {
  console.log(`🚀 Server Ready at ${address}:${port}! 🚀`)
});