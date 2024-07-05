import { EventEmitter } from "events";

declare class Base extends EventEmitter {
    stopping: boolean;
    active: number;

    constructor(handler: any);

    init(): void;

    stop(cb: (err?: Error | null, results?: any) => void): void;
    start(cb: (err?: Error | null, results?: any) => void): void;
    _stop(cb: (err?: Error | null, results?: any) => void): void;
    _start(cb: (err?: Error | null, results?: any) => void): void;
}

export default Base;
