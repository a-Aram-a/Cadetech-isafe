import { jwtMiddleware } from "../../libraries/auth/middlewares";
import { router, publicRouter } from "./entry-points/api/routes";

export default function initMeters(app: any) {
    app.use('/meters', publicRouter)
    app.use('/meters', jwtMiddleware, router)
}