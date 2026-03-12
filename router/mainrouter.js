import {Router} from "express";
import UserController from "../controllers/user-controller.js";
const router = new Router();

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
router.post('/registration', UserController.registration);

router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.get('/activate/:link', UserController.activate);
router.get('/refresh', UserController.refresh);
router.get('/users', UserController.getUsers);

export default router;