//user model
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('Users',{
        userName: {
            type:DataTypes.STRING,
            allowNull: false
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false
        },
        authorName: {
            type: DataTypes.STRING,
            allowNull:true
        }
    }, {timestamps: false})
    return User
}