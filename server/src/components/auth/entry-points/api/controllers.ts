import { ApiError } from "../../../../libraries/errors";
import { register, login, refresh, logout, updateUser } from "../../domain/services";


export const loginController = async (req: any, res: any, next: any) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        if (!email || !password) {
            throw new ApiError(400, 'Email and password are required')
        }

        const { token, refreshToken, user } = await login(email, password);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        })

        return res.json({ token, user });
    } catch (error) {
        next(error)
    }
}


export const registerController = async (req: any, res: any, next: any) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        if (!email || !password) {
            throw new ApiError(400, 'Email and password are required')
        }

        const user = await register(email, password);

        return res.json({ user });
    } catch (error) {
        next(error)
    }
}

export const refreshController = async (req: any, res: any, next: any) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            throw new ApiError(401, 'Refresh token is required')
        }

        const { token, refreshToken: newRefreshToken } = await refresh(refreshToken);

        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        })

        return res.json({ token });
    } catch (error) {
        next(error)
    }
}

export const logoutController = async (req: any, res: any, next: any) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        await logout(refreshToken)

        res.clearCookie('refreshToken')

        return res.json({ message: 'Logout successful' })
    } catch (error) {
        next(error)
    }
}

export const updateUserController = async (req: any, res: any, next: any) => {
    try {
        const userId = req.params.id
        const data = req.body
        if (!userId) {
            throw new ApiError(400, 'User id is required')
        }
        if(!data || Object.keys(data).length === 0) {
            throw new ApiError(400, 'User data is required')
        }

        const user = await updateUser(userId, data);

        res.json(user);
    } catch (error) {
        next(error)
    }
}