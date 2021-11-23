import { Client } from 'discord.js';
import { Close } from 'src/handlers/SQL';
import { delay, log } from 'src/Util';

export default {
    name: 'SIGUSR2',
    process: true,
    once: true,
    async run(gideon: Client): Promise<void> {
        const shard_index = gideon?.shard?.ids?.[0] ?? '0';
        log('Shard `' + shard_index + '` shutting down...');

        await delay(2000); //wait 2 secs for all vcs

        gideon.destroy();
        if (gideon.WSClient) gideon.WSClient.disconnect();
        Close();

        await delay(200); //wait for db & gateway

        log('Shard ' + shard_index + ' finished, exiting process...');
        process.kill(process.pid, 'SIGUSR2');
    }
};