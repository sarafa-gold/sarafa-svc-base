import EventEmitter from "events";
import async from 'async'

class Base extends EventEmitter {
    stopping: boolean = false
    active: number;


    constructor(handler: any) {
        super()

        this.active = 0
    }
    init() {
    }

    _start(cb: (err?: Error | null, results?: any) => void) {
    }

    _stop(cb: (err?: Error | null, results?: any) => void) {

    }

    stop(cb: (err?: Error | null, results?: any) => void) {
        const asyncSeries = []
        asyncSeries.push((next: () => any) => {
            this._stop(next)
        })
        asyncSeries.push((next: () => void) => {
            this.active = 0;
            next();
        });
        this.stopping = true

        async.series(asyncSeries, cb)
    }
    start(cb: (err?: Error | null, results?: any) => void) {
        const asyncSeries = []
        asyncSeries.push((next: () => void) => {
            this.active = 1;
            next();
        });
        asyncSeries.push((next: () => any) => {
            this._start(next)
        })
        async.series(asyncSeries, (err) => {
            if (err) {
                console.trace()
                throw err
            }

            process.nextTick(() => {
                this.emit('started')
                cb()
            })
        })
    }
}

export default Base