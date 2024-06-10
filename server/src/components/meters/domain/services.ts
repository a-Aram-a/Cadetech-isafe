import grpc  from '@grpc/grpc-js';
import device_grpc from "@chirpstack/chirpstack-api/api/device_grpc_pb"
import device_pb from "@chirpstack/chirpstack-api/api/device_pb"

import Meter from "../data-access/model/meter";
import meterMessage from "../data-access/model/meterMessage";

export async function getMeters() {
    const meters = await Meter.find();
    return meters
}


export async function getMetersByUser(userId: string) {
    const meters = await Meter.find({ user: userId });
    return meters
}


export async function getMeterByDevEUI(devEUI: string) {
    const meter = await Meter.findOne({ devEUI });
    return meter
}


export async function createMeter(meter: any) {
    const newMeter = new Meter(meter);
    return await newMeter.save();
}

export async function getMeterById(id: string) {
    const meter = await Meter.findById(id);
    return meter
}

export async function deleteMeterById(id: string) {
    const meter = await Meter.findByIdAndDelete(id);
    return meter
}


export async function getMeterMessagesByMeterId(id: string) {
    const messages = await meterMessage.find({ meter: id });
    return messages
}


export async function createMeterMessage(message: any) {
    const newMessage = new meterMessage(message);
    return await newMessage.save();
}


export async function getApplicationsByTenantId(tenantId: string) {

}