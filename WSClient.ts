/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import WebSocket from 'ws';
import EventEmitter from 'events';

export interface Packet {
    op: number;
    d?: Data;
}

export interface Data {
    type?: string;
    guild_count?: number;
    guilds?: number;
    user_count?: number;
    command_count?: number;
    ai_count?: number;
    token?: string;
}

class WSClient extends EventEmitter {
    url: string;
    token: string;
    shutdown: boolean;
    client: WebSocket | null;
    lastPing: Date;
    lastPong: Date;
    /**
     * @param {string} url 
     * @param {string} token 
     */
    constructor(url: string, token: string) {
        super();

        if (!url || !token) throw new Error('Invalid args');

        this.client = null;
        this.url = url;
        this.token = token;
        this.shutdown = false;
        this.lastPing = new Date();
        this.lastPong = new Date();

        this.connect();

        setInterval(() => {
            if (!this.connected && !this.shutdown) this.connect();
        }, 3e3);
    }

    connect() {
        this.client = new WebSocket(this.url);

        this.client.on('open', () => {
            this._send({op: 0, d: {token: this.token}});
        });

        this.client.on('message', d => {
            const json = JSON.parse(<string>d);

            if (!json || json.op == undefined) return;

            switch (json.op) {
                case 0: {
                    this.emit('READY');
                    return;
                }

                case 1: {
                    if (!json.d) return;
                    this.emit('DATA', json.d);
                    return;
                }

                case 2: {
                    this.lastPing = new Date();
                    this._send({op: 2});
                    return;
                }

                case 3: {
                    this.lastPong = new Date();
                    return;
                }

                default: return;
            }
        });

        this.client.on('error', e => console.log('WebSocket error: ' + e.message));
    }

    _send(packet: Packet) {
        if (this.connected) this.client?.send(JSON.stringify(packet));
    }

    send(data: Data) {
        this._send({op: 1, d: data});
    }

    disconnect() {
        this.shutdown = true;
        if (this.client) this.client.close();
        this.client = null;
    }

    get connected() {
        return this.client?.readyState == WebSocket.OPEN;
    }

    get ping() {
        return Math.abs(this.lastPing.getTime() - this.lastPong.getTime());
    }
}

export default WSClient;