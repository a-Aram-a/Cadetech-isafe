import { Schema, model } from "mongoose";

const refreshTokenSchema = new Schema({
    token: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    expiresAt: {
        type: Date,
        required: true
    },
    revoked: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });


const RefreshToken = model('RefreshToken', refreshTokenSchema);
export default RefreshToken;