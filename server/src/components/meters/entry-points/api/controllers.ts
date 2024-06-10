import { ApiError } from '../../../../libraries/errors';
import User from '../../../auth/data-access/model/user';
import { getMeters, getMetersByUser, getMeterById, createMeter, deleteMeterById, createMeterMessage, getMeterMessagesByMeterId, getMeterByDevEUI } from '../../domain/services'
import meterMessageEmitter from '../message-queue/meterMessage';


export async function getMetersController(req: any, res: any, next: any) {
    try {
        if (req.user.role !== 'admin') {
            const meters = await getMetersByUser(req.user._id);
            console.log(meters)
            res.json(meters);
        } else {
            const meters = await getMeters();
            res.json(meters);
        }
    } catch (error) {
        next(error)
    }
}

export async function createMeterController(req: any, res: any, next: any) {
    try {
        const devEUI = req.body.devEUI
        const name = req.body.name
        const description = req.body.description
        const type = req.body.type
        const address = req.body.address
        const user = req.body.user


        if (!devEUI) {
            throw new ApiError(400, 'DevEUI is required')
        }

        if (!name) {
            throw new ApiError(400, 'Name is required')
        }

        if (!type) {
            throw new ApiError(400, 'Type is required')
        }

        if (!address) {
            throw new ApiError(400, 'Address is required')
        }

        if (user) {
            const existingUser = await User.findById(user)
            if (!existingUser) {
                throw new ApiError(400, 'User not found')
            }
        }

        const existingMeter = await getMeterByDevEUI(devEUI);
        if (existingMeter) {
            throw new ApiError(400, 'Meter with this DevEUI already exists')
        }

        const meter = await createMeter({
            devEUI,
            name,
            description,
            type,
            address,
            user: user ?? null
        });

        res.json(meter);
    } catch (error) {
        next(error)
    }
}


export async function getMeterByIdController(req: any, res: any, next: any) {
    try {
        const id = req.params.id
        if (!id) {
            throw new ApiError(400, 'Meter id is required')
        }
        const meter = await getMeterById(id);
        if (!meter) {
            throw new ApiError(400, 'Meter not found')
        }
        if (!meter.user?.equals(req.user._id) && req.user.role !== 'admin') {
            throw new ApiError(403, 'Unauthorized')
        }
        res.json(meter);
    } catch (error) {
        next(error)
    }
}


export async function deleteMeterByIdController(req: any, res: any, next: any) {
    try {
        const id = req.params.id
        if (!id) {
            throw new ApiError(400, 'Meter id is required')
        }
        const meter = await getMeterById(id);
        if (!meter) {
            throw new ApiError(400, 'Meter not found')
        }

        const deleteMeter = await deleteMeterById(id);
        res.json(deleteMeter);
    } catch (error) {
        next(error)
    }
}


export async function getMeterMessagesController(req: any, res: any, next: any) {
    try {
        const id = req.params.id
        if (!id) {
            throw new ApiError(400, 'Meter id is required')
        }
        const meter = await getMeterById(id);
        if (!meter) {
            throw new ApiError(400, 'Meter not found')
        }
        if (!meter.user?.equals(req.user._id) && req.user.role !== 'admin') {
            throw new ApiError(403, 'Unauthorized')
        }
        const messages = await getMeterMessagesByMeterId(id);
        res.json(messages);
    } catch (error) {
        next(error)
    }
}


export async function createMeterMessageController(req: any, res: any, next: any) {
    try {
        const id = req.params.id
        if (!id) {
            throw new ApiError(400, 'Meter id is required')
        }
        const meter = await getMeterById(id);
        if (!meter) {
            throw new ApiError(400, 'Meter not found')
        }
        const message = req.body.message
        if (!message) {
            throw new ApiError(400, 'Message is required')
        }
        const meterMessage = await createMeterMessage({ meter: id, message });

        meterMessageEmitter.emit(`meter-${id}-message`, meterMessage);

        res.json(meterMessage);
    } catch (error) {
        next(error)
    }
}


export async function chirpStackCallbackController(req: any, res: any, next: any) {
    try {
        const message = JSON.stringify(req.body)
        const devEUI = req.body?.deviceInfo?.devEui
        if (!message) {
            throw new ApiError(400, 'Message is required')
        }
        if (!devEUI) {
            throw new ApiError(400, 'DevEUI is required')
        }
        const meter = await getMeterByDevEUI(devEUI);
        if (!meter) {
            throw new ApiError(400, 'Meter not found')
        }
        const meterMessage = await createMeterMessage({ meter: meter._id, message });

        meterMessageEmitter.emit(`meter-${meter._id}-message`, meterMessage);

        res.json(meterMessage);
    } catch (error) {
        next(error)
    }
}


export async function meterMessageListenController(req: any, res: any, next: any) {
    try {
        const id = req.params.id
        if (!id) {
            throw new ApiError(400, 'Meter id is required')
        }
        const meter = await getMeterById(id);
        if (!meter) {
            throw new ApiError(400, 'Meter not found')
        }
        if (!meter.user?.equals(req.user._id) && req.user.role !== 'admin') {
            throw new ApiError(403, 'Unauthorized')
        }

        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Connection', 'keep-alive');
        res.flushHeaders(); // flush the headers to establish SSE with client

        // Send a message on connection
        res.write('event: connected\n');
        res.write(`data: subscribed\n\n`);

        const callback = (message: any) => {
            res.write('event: message\n');
            res.write(`data: ${JSON.stringify(message)}\n\n`);
        }
        meterMessageEmitter.on(`meter-${id}-message`, callback);

        // Close the connection when the client disconnects
        req.on('close', () => {
            meterMessageEmitter.removeListener(`meter-${id}-message`, callback);
            res.end('OK')
        })
    } catch (error) {
        next(error)
    }
}