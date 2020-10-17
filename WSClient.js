import WebSocket from 'ws';
import EventEmitter from 'events';

class WSClient extends EventEmitter {
    /**
     * @param {string} url 
     * @param {string} token 
     */
    constructor(url, token) {
        super();

        if (!url || !token) throw new Error('Invalid args');

        this.url = url;
        this.token = token;
        this.shutdown = false;

        this.connect();

        setInterval(() => {
            if (!this.connected && !this.shutdown) this.connect();
        }, 3e3);
    }

    connect() {
        this.client = new WebSocket(this.url);

        this.client.on('open', () => {
            this._send({op: 0, token: this.token});
        });

        this.client.on('message', d => {
            let json = JSON.parse(d);

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

    _send(packet) {
        if (this.connected) this.client.send(JSON.stringify(packet));
    }

    send(data) {
        this._send({op: 1, d: data});
    }

    disconnect() {
        this.shutdown = true;
        if (this.client) this.client.close();
        this.client = null;
    }

    get connected() {
        return this.client && this.client.readyState == this.client.OPEN;
    }

    get ping() {
        return Math.abs(this.lastPing - this.lastPong);
    }
}

export default WSClient;