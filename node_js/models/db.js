const Sequelize = require("sequelize")

const sequelize = new Sequelize('db_stefany', 'stefany', 'stefany', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = {
    Sequelize : Sequelize,
    sequelize : sequelize
}