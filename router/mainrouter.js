import {Router} from "express";
import UserController from "../controllers/user-controller.js";
const router = new Router();
import {body} from "express-validator";

router.post('/registration',
    body("email").isEmail(),
    body("password").isLength({min: 4, max: 32}),
    UserController.registration
);

router.post('/login',
    body("email").isEmail(),
    body("password").isLength({min: 4, max: 32}),
    UserController.login
    );

router.post('/logout', UserController.logout);

router.get('/refresh', UserController.refresh);

export default router;