import Util from '../../Util.js';

export default {
    name: 'SIGUSR2',
    process: true,
    once: true,
    async run() {
        let shard_index = process.gideon && process.gideon.shard && process.gideon.shard.ids ? process.gideon.shard.ids[0] : '0';
        Util.log('Shard `' + shard_index + '` shutting down...');

        for (let guild of process.gideon.guilds.cache.values()) {
            if (guild.voice && guild.voice.connection) {
                guild.voice.connection.disconnect();
            }
        }

        await Util.delay(2000); //wait 2 secs for all vcs

        process.gideon.destroy();
        if (process.gideon.WSClient) process.gideon.WSClient.disconnect();
        Util.SQL.Close();

        await Util.delay(200); //wait for db & gateway

        Util.log('Shard ' + shard_index + ' finished, exiting process...');
        process.kill(process.pid, 'SIGUSR2');
    }
};