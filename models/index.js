import User from "./user-model.js";
import Token from "./token-model.js";

User.hasOne(Token, {
    foreignKey: 'userId',
    onDelete: 'CASCADE' // При удалении пользователя удаляется токен
});
Token.belongsTo(User, {
    foreignKey: 'userId'
});

export default {User, Token}