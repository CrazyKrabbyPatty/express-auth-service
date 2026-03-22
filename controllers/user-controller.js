import UserService from "../service/user-service.js";
import {validationResult} from "express-validator";
import ApiError from "../exceptions/api-error.js";
import userService from "../service/user-service.js";

class UserController {
    async registration(req, res, next){
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest("Invalid validation", errors.array()));
            }
            const {email, password} = req.body;
            const userData = await UserService.registration(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async login(req, res, next){
        try {
            const {email, password} = req.body;
            const userData = await userService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(userData);
        } catch (e) {
            next(e)
        }
    }

    async logout(req, res, next){
        try {

        } catch (e) {
            next(e)
        }
    }

    async activate(req, res, next){
        try {

        } catch (e) {
            next(e)
        }
    }

    async refresh(req, res, next){
        try {

        } catch (e) {
            next(e)
        }
    }

    async getUsers(req, res, next){
        try {
            res.json(['xuy', 'slava'])
        } catch (e) {
            next(e)
        }
    }
}

export default new UserController();