import router from "./entry-points/api/routes";

export default function initAuth(app: any) {
    app.use('/auth', router)
}