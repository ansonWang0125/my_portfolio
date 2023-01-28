module.exports = (sequelize, DataTypes) => {
    const Article = sequelize.define('Article',{
        category: {
            type:DataTypes.STRING,
            allowNull: false
        },
        title: {
            type:DataTypes.STRING,
            allowNull:false
        },
        titleState: {
            type:DataTypes.JSON,
            allowNull:false
        },
        author: {
            type:DataTypes.STRING,
        },
        authorState: {
            type:DataTypes.JSON,
            allowNull:false
        },
        time: {
            type:DataTypes.DATE,
            allowNull:false
        },
        content: {
            type:DataTypes.JSON,
            allowNull:false
        },
    }, {timestamps: false})
    return Article
}