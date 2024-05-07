import { Schema, model } from "mongoose";

const meterMessageSchema = new Schema({
    meter: {
        type: Schema.Types.ObjectId,
        ref: 'Meter',
        required: true
    },
    message: {
        type: String,
        required: true
    }
}, { timestamps: true })


const meterMessage = model('MeterMessage', meterMessageSchema);
export default meterMessage