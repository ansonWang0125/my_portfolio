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
    }, {timestamps: false})
    User.sync()
    return User
}