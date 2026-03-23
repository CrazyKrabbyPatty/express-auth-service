import sequelize from "../db.js"
import {DataTypes} from "sequelize";

const UserSchema = sequelize.define("UserSchema",{
    id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
    email: {type: DataTypes.STRING, allowNull: false, unique: true},
    password: {type: DataTypes.STRING, allowNull: false},
})

export default UserSchema