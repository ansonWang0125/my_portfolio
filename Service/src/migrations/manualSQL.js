const fs = require('fs');
const path = require('path');

const jsonToSQL = () =>{
    // console.log("Current directory:", __dirname);
    let rawdata = fs.readFileSync(path.resolve(__dirname,"../data/mydata1.json"))
    // console.log(rawdata);
    let data = JSON.parse(rawdata);
    // console.log(data)
    // console.log(data.articles[0].titleState.blocks[0].text)
    // or whatever you wanna do with the data
    sql = ``

    data.users.forEach(user => sql += `INSERT INTO "Users" ("id", "userName", "email", "googleName", "password", "role", "photo", "verified", "provider", "authorName", "createdAt", "updatedAt") VALUES ('${user.id}', '${user.userName}', '${user.email}', '${user.googleName}', '${user.password}', '${user.role}', '${user.photo}', '${user.verified}', '${user.provider}', '${user.authorName}', '${user.createdAt}', '${user.updatedAt}'); `)
    data.articles.forEach(article => sql += `INSERT INTO "Articles" ("id", "category", "title", "titleState", "author", "authorState", "time", "content", "createTime", "searchTimes", "userID") VALUES ('${article.id}', '${article.category}', '${article.title}', ''${JSON.stringify(article.titleState).replaceAll("'","\\\"")}', '${article.author}', ''${JSON.stringify(article.authorState).replaceAll("'","\\\"")}', '${article.time}', '${JSON.stringify(article.content).replaceAll("'","\\\"")}', '${article.createTime}', '${article.searchTimes}', '${article.userID}'); `)
    return sql
}

module.exports = {
    jsonToSQL
}