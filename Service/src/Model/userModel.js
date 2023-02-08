//user model
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('Users',{
        userName: {
            type:DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type:DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        googleName: {
            type: DataTypes.STRING,
            defaultValue: ''
        }, 
        password:{
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            defaultValue: 'user'
        },
        photo: {
            type: DataTypes.STRING,
            defaultValue: 'dfault.png'
        }, 
        verified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        provider: {
            type: DataTypes.STRING,
            defaultValue: 'local'
        },
        authorName: {
            type: DataTypes.STRING,
            allowNull:true,
            unique: true,
            defaultValue: ''
        }
    }, {timestamps: true})
    return User
}