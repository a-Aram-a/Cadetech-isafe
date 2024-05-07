import { Router } from "express";
import { getMetersController, createMeterController, getMeterByIdController, deleteMeterByIdController, getMeterMessagesController, createMeterMessageController, createMeterMessageBySerialController, meterMessageListenController } from "./controllers";
import { adminMiddleware } from "../../../../libraries/auth/middlewares";

const router = Router()
const publicRouter = Router()

router.get('/', getMetersController)
router.post('/', adminMiddleware, createMeterController)

router.get('/:id', getMeterByIdController)
router.delete('/:id', adminMiddleware, deleteMeterByIdController)

router.get('/:id/messages', getMeterMessagesController)
router.post('/:id/messages', adminMiddleware, createMeterMessageController)

publicRouter.post('/serial/:serial/messages', createMeterMessageBySerialController)

router.get('/:id/messages/listen', meterMessageListenController)

export { router, publicRouter }