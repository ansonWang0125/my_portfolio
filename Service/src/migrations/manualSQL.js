const jsonToSQL = () =>{
    fetch("./mydata1.json")
    .then(Response => Response.json())
    .then(data => {
        console.log(data);
  		// or whatever you wanna do with the data
        sql = ``
        data.users.foreach(user => sql += `INSERT INTO "Users" ("id", "userName", "email", "googleName", "password", "role", "photo", "verified", "provider", "authorName", "createAt", "updateAt") VALUES 
                                        ('${user.id}', "${user.userName}", "${user.email}", "${user.googleName}", "${user.password}", "${user.role}", "${user.photo}", "${user.verified}", "${user.provider}", "${user.authorName}", "${user.createAt}", "${user.updateAt}"); `)
        data.articles.foreach(article => sql += `INSERT INTO "Article" ("id", "category", "title", "titleState", "author", "authorState", "time", "content", "createTime", "searchTimes", "userID") VALUES 
                                        ('${article.id}', "${article.category}", "${article.title}", "${article.author}", "${article.authorState}", "${article.time}", "${article.content}", "${article.createTime}", "${article.searchTimes}", "${article.userID}"); `)
        return sql
    });
}

module.exports = {
    jsonToSQL
}