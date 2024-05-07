import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { ApiError } from "../../../libraries/errors"
import User from "../data-access/model/user"
import CONFIG from '../../../config'
import RefreshToken from '../data-access/model/refreshtoken'
import mongoose from 'mongoose'


async function generateTokenPair(userId: mongoose.Types.ObjectId, payload: { userId: string, role: string }) {
    // generate jwt token
    const token = jwt.sign(payload, CONFIG.JWT_SECRET, { expiresIn: '1h' })
    // generate refresh token (random bytes)
    const refreshToken = new RefreshToken({
        token: crypto.randomBytes(64).toString('hex'),
        user: userId,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
    })
    await refreshToken.save()

    return { token, refreshToken: refreshToken.token }
}

export async function login(email: string, password: string) {
    const user = await User.findOne({ email })

    if (!user) {
        throw new ApiError(404, 'User not found')
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        throw new ApiError(401, 'Invalid password')
    }

    const { token, refreshToken } = await generateTokenPair(user._id, { userId: user._id.toString(), role: user.role })

    const { password: _, ...userWithoutPassword } = user.toObject()

    return {
        token,
        refreshToken,
        user: userWithoutPassword
    }
}

export async function register(email: string, password: string) {
    if (!email || !password) {
        throw new ApiError(400, 'Email and password are required')
    }

    const user = await User.findOne({ email })

    if (user) {
        throw new ApiError(400, 'User with this email already exists')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new User({
        email,
        password: hashedPassword
    })

    return await newUser.save()
}


export async function refresh(refreshToken: string) {
    const refToken = await RefreshToken.findOne({ token: refreshToken })

    if (!refToken) {
        throw new ApiError(401, 'Invalid refresh token')
    }

    if (refToken.revoked) {
        throw new ApiError(401, 'Refresh token revoked')
    }

    if (refToken.expiresAt < new Date()) {
        throw new ApiError(401, 'Refresh token expired')
    }

    const user = await User.findById(refToken.user)

    if (!user) {
        throw new ApiError(401, 'User not found')
    }

    const { token, refreshToken: newRefreshToken } = await generateTokenPair(user._id, { userId: user._id.toString(), role: user.role })

    refToken.revoked = true
    await refToken.save()

    return { token, refreshToken: newRefreshToken }
}