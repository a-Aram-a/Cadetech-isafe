import jwt from 'jsonwebtoken'
import CONFIG from '../../config'
import User from '../../components/auth/data-access/model/user'
import { ApiError } from '../errors'

export async function jwtMiddleware(req: any, res: any, next: any) {
    try {
        const token = req.headers['authorization']?.split(' ')[1]
        if (!token) {
            throw new ApiError(401, 'No token provided')
        }

        try {
            const decoded = jwt.verify(token, CONFIG.JWT_SECRET) as { userId: string, role: string }
            const user = await User.findById(decoded.userId)

            if (!user) {
                throw new Error('User not found')
            }

            req.user = user

            next()
        } catch (error) {
            throw new ApiError(401, 'Invalid token')
        }
    } catch (error) {
        next(error)
    }
}


export function adminMiddleware(req: any, res: any, next: any) {
    if (req.user.role !== 'admin') {
        throw new ApiError(403, 'Unauthorized')
    }
    next()
}