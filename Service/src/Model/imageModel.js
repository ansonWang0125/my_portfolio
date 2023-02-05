const { Sequelize } = require(".")

module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define('Image',{
        originalname: {
            type: DataTypes.STRING
        },
        data: {
            type: DataTypes.BLOB('long')
        }
    }, {timestamps: false})
    return Image
}