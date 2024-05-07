import EventEmitter from "events"

class MeterMessageEmitter extends EventEmitter {
    constructor() {
        super()
    }
}

const meterMessageEmitter = new MeterMessageEmitter()

export default meterMessageEmitter