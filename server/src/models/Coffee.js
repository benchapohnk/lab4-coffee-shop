// src/models/Coffee.js
module.exports = (sequelize, DataTypes) => {
    const Coffee = sequelize.define('Coffee', {
        name: DataTypes.STRING,
        price: DataTypes.INTEGER,
        type: DataTypes.STRING, // hot, iced, frappe
        status: DataTypes.STRING, // หรือใช้ DataTypes.BOOLEAN ก็ได้ครับ
      description: DataTypes.STRING
    })
    return Coffee
}
