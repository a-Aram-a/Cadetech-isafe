import { Schema, model } from "mongoose";

const meterSchema = new Schema({
    devEUI: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    type: {
        type: String,
        enum: ['virtual', 'smart-as0101', 'isafe'],
        default: 'virtual'
    },
    address: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });


const Meter = model('Meter', meterSchema);
export default Meter