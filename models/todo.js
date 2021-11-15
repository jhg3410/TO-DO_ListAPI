const Sequelize = require('sequelize');

module.exports = class Todo extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
        content: {
            type : Sequelize.STRING(50),
            allowNull : true,
        },
        isCompleted: {
            type : Sequelize.BOOLEAN()
        },
    },{
        sequelize,
        timestamps: true,
        modelName: 'Todo',
        tableName: 'todos',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        });
    }
    static associate(db) {
        db.Todo.belongsTo(db.User, { foreignKey: 'member', targetKey: 'id' });
    }
};
        