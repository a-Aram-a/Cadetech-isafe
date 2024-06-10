import CONFIG from "../../config";
import User from "./data-access/model/user";
import { register } from "./domain/services";
import router from "./entry-points/api/routes";

export default function initAuth(app: any) {
    app.use('/auth', router)

    // create default admin
    const defaultAdminEmail = CONFIG.ADMIN_EMAIL
    const defaultAdminPassword = CONFIG.ADMIN_PASSWORD
    if (defaultAdminEmail && defaultAdminPassword) {
        User.findOne({ email: defaultAdminEmail }).then((user) => {
            if (!user) {
                register(defaultAdminEmail, defaultAdminPassword, 'admin')
            }
        })
    }
}