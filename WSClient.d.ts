import EventEmitter from 'events';

class WSClient extends EventEmitter {
    constructor(url: string, token: string);
    public get connected(): boolean;
    public _send(packet: Packet): void;
    public send(data: Data): void;

    public on<K extends keyof WSEvents>(event: K, listener: (...args: WSEvents[K]) => void): this;
    public on<S extends string | symbol>(
      event: Exclude<S, keyof WSEvents>,
      listener: (...args: any[]) => void,
    ): this;
}


interface Packet {
    op: number;
    d: Data;
}

interface Data {
    type: 'REQUEST_STATS' | 'STATS';
    guild_count: number;
    user_count: number;
    command_count: number;
    ai_count: number;
}

interface WSEvents {
    READY: [];
    DATA: [Data];
}

export = WSClient;