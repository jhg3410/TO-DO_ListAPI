const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
      return super.init({
        name: {
            type: Sequelize.STRING(20),
            allowNull: false,
            unique: false,
        },
        age: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING(30),
            allowNull: false,
            unique: true,
        },
        todoList: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
    }, {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'User',
        tableName: 'users',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
    });
}
static associate(db) {
    db.Todo.belongsTo(db.User, { foreignKey: 'member', targetKey: 'id' });
  }
}
