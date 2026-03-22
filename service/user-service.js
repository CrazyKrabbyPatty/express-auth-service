import UserModel from "../models/user-model.js";
import bcrypt from "bcrypt";
import {v4 as uuid_v4} from "uuid";
import MailService from "./mail-service.js";
import TokenService from "./token-service.js";
import UserDto from "../dtos/user-dto.js";
import ApiError from "../exceptions/api-error.js";

class UserService {
    async registration(email, password){
        const candidate = await UserModel.findOne({where: {email}})
        if (candidate){
            throw ApiError.BadRequest(`User with email ${email} already exists`)
        }
        const hashedPassword = await bcrypt.hash(password, 6);
        const activationLink = uuid_v4();

        const user = await UserModel.create(
            {
                email: email,
                password: hashedPassword,
                activationLink: activationLink,
            }
        )
        await MailService.sendActivationLink(email, activationLink);

        const userDto = new UserDto(user);
        const tokens = TokenService.generateTokens({...userDto});
        await TokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto};
    }

    async login(email, password){
        const user = await UserModel.findOne({where: {email}})
        console.log(user)
        if (!user){
            throw ApiError.BadRequest(`User with email ${email} does not exist`)
        }
        const isPassEquals = bcrypt.compare(password, user.password);
        if (!isPassEquals){
            throw ApiError.BadRequest(`Invalid password`)
        }
        const userDto = new UserDto(user);
        const tokens = TokenService.generateTokens({...userDto});

        await TokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto};
    }
}

export default new UserService();