import {Router} from "express";
import UserController from "../controllers/user-controller.js";
const router = new Router();
import {body} from "express-validator";

/**
 * @swagger
 * /api/registration:
 *   post:
 *     summary: Регистрация нового пользователя
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: 12345678
 *     responses:
 *       200:
 *         description: Пользователь успешно создан
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                 refreshToken:
 *                   type: string
 *                 user:
 *                  type: object
 *                  properties:
 *                    email:
 *                      type: string
 *                    id:
 *                      type: string
 *                    isActivated:
 *                      type: boolean
 *
 *       400:
 *         description: Ошибка валидации или пользователь уже существует
 */
router.post('/registration',
    body("email").isEmail(),
    body("password").isLength({min: 4, max: 32}),
    UserController.registration
);

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Авторизация существующего пользователя
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: 12345678
 *     responses:
 *       200:
 *         description: Успешная авторизация
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                 refreshToken:
 *                   type: string
 *                 user:
 *                  type: object
 *                  properties:
 *                    email:
 *                      type: string
 *                    id:
 *                      type: string
 *                    isActivated:
 *                      type: boolean
 *
 *       400:
 *         description: Ошибка валидации или неверный логин/пароль
 */
router.post('/login',
    body("email").isEmail(),
    body("password").isLength({min: 4, max: 32}),
    UserController.login
    );

/**
 * @swagger
 * /api/logout:
 *   post:
 *     summary: Выход из сессии
 *     tags: [Auth]
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: Успешный выход из сессии
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                 refreshToken:
 *                   type: string
 *                 user:
 *                  type: object
 *                  properties:
 *                    email:
 *                      type: string
 *                    id:
 *                      type: string
 *                    isActivated:
 *                      type: boolean
 *
 *       400:
 *         description: Ошибка валидации или неверный логин/пароль
 */
router.post('/logout', UserController.logout);

router.get('/refresh', UserController.refresh);

export default router;