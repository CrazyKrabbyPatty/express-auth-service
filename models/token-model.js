import sequelize from "../db.js"
import {DataTypes} from "sequelize";

const TokenSchema = sequelize.define("TokenSchema",{
    user: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
    refreshToken: {type: DataTypes.STRING, allowNull: false},
})

export default TokenSchema