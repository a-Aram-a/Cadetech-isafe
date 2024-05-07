import { Router } from "express";
import { loginController, registerController, refreshController } from "./controllers";

const router = Router()

router.post('/login', loginController)
router.post('/register', registerController)
router.post('/refresh', refreshController)

export default router