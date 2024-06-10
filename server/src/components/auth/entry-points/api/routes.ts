import { Router } from "express";
import { loginController, registerController, refreshController, logoutController, updateUserController } from "./controllers";
import { adminMiddleware, jwtMiddleware } from "../../../../libraries/auth/middlewares";

const router = Router()

router.post('/login', loginController)
router.post('/register', registerController)
router.post('/refresh', refreshController)
router.post('/logout', logoutController)

router.patch('/users/:id', jwtMiddleware, adminMiddleware, updateUserController)

export default router